import { useRef, useState, useEffect } from 'react';

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [storedFaceData, setStoredFaceData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ type: 'info', message: 'Initializing...' });
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const faceDetectionRef = useRef(null);
  const cameraRef = useRef(null);
  const resultsRef = useRef(null);

  // Draw results function
  const drawResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.detections) {
      for (const detection of results.detections) {
        const bbox = detection.boundingBox;
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          bbox.xCenter * canvas.width - (bbox.width * canvas.width) / 2,
          bbox.yCenter * canvas.height - (bbox.height * canvas.height) / 2,
          bbox.width * canvas.width,
          bbox.height * canvas.height
        );
      }
    }
  };

  // MediaPipe loading function
  const loadMediaPipe = async () => {
    try {
      const faceDetectionScript = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@latest/face_detection.js';
      const cameraUtilsScript = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@latest/camera_utils.js';

      // Load scripts dynamically
      await Promise.all([
        loadScript(faceDetectionScript),
        loadScript(cameraUtilsScript)
      ]);

      // Now we can safely use the global FaceDetection and Camera objects
      const FaceDetection = window.FaceDetection;
      const Camera = window.Camera;

      if (!FaceDetection || !Camera) {
        throw new Error('MediaPipe libraries not loaded properly');
      }

      return { FaceDetection, Camera };
    } catch (error) {
      console.error('Failed to load MediaPipe:', error);
      throw new Error('Failed to load face detection libraries');
    }
  };

  // Helper function to load scripts
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    const initializeFaceDetection = async () => {
      try {
        setStatus({ type: 'info', message: 'Loading face detection...' });
        
        const { FaceDetection, Camera } = await loadMediaPipe();
        
        if (!mounted) return;

        // Initialize Face Detection
        const faceDetection = new FaceDetection({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@latest/${file}`;
          }
        });

        const initPromise = faceDetection.initialize();
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Face detection initialization timeout')), 10000);
        });

        await Promise.race([initPromise, timeoutPromise]);

        faceDetection.setOptions({
          modelSelection: 0,
          minDetectionConfidence: 0.5
        });

        faceDetection.onResults((results) => {
          if (mounted) {
            resultsRef.current = results;
            if (results.detections?.length > 0) {
              drawResults(results);
            }
          }
        });

        faceDetectionRef.current = faceDetection;

        if (videoRef.current) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
              }
            });

            videoRef.current.srcObject = stream;
            await videoRef.current.play();

            const camera = new Camera(videoRef.current, {
              onFrame: async () => {
                try {
                  if (faceDetectionRef.current && videoRef.current && mounted) {
                    await faceDetectionRef.current.send({ image: videoRef.current });
                  }
                } catch (error) {
                  if (!error.message.includes('Aborted') && mounted) {
                    console.error('Frame processing error:', error);
                  }
                }
              },
              width: 1280,
              height: 720
            });

            await camera.start();
            cameraRef.current = camera;

            cleanup = () => {
              camera.stop();
              stream.getTracks().forEach(track => track.stop());
            };

            if (mounted) {
              setIsReady(true);
              setStatus({ type: 'success', message: 'Ready! Click "Store Face" to begin.' });
            }
          } catch (error) {
            throw new Error(`Camera setup failed: ${error.message}`);
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
        
        if (mounted) {
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
            setStatus({ 
              type: 'warning', 
              message: `Retrying initialization (${retryCount + 1}/${maxRetries})...` 
            });
            setTimeout(initializeFaceDetection, 2000);
          } else {
            setStatus({ 
              type: 'error', 
              message: `Initialization failed: ${error.message}. Please check your camera and browser permissions.` 
            });
            setError(error);
          }
        }
      }
    };

    initializeFaceDetection();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [retryCount]);

  const storeFace = async () => {
    try {
      setStatus({ type: 'info', message: 'Detecting face...' });

      const getDetectionResults = () => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Face detection timeout'));
          }, 5000);

          const checkResults = () => {
            if (resultsRef.current?.detections?.length > 0) {
              clearTimeout(timeout);
              resolve(resultsRef.current.detections[0]);
            } else if (resultsRef.current?.detections?.length === 0) {
              clearTimeout(timeout);
              reject(new Error('No face detected'));
            } else {
              setTimeout(checkResults, 100);
            }
          };

          checkResults();
        });
      };

      const faceData = await getDetectionResults();
      setStoredFaceData(faceData);
      setStatus({ 
        type: 'success', 
        message: 'Face stored successfully! Click "Start Verification" to begin matching.' 
      });

    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to store face. Please try again.' 
      });
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    setStatus({ type: 'info', message: 'Retrying initialization...' });
  };

  const toggleVerification = () => {
    if (!storedFaceData) {
      setStatus({ type: 'error', message: 'Please store a face first.' });
      return;
    }

    setIsVerifying(!isVerifying);
    setStatus({ 
      type: 'info', 
      message: isVerifying ? 'Verification stopped.' : 'Starting verification...' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Face Recognition</h1>
          <p className="text-gray-600 mt-2">Secure face detection and verification</p>
        </div>

        <div
          className={`p-4 rounded-lg border ${
            status.type === 'error'
              ? 'bg-red-100 border-red-500 text-red-700'
              : status.type === 'success'
                ? 'bg-green-100 border-green-500 text-green-700'
                : status.type === 'warning'
                  ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                  : 'bg-blue-100 border-blue-500 text-blue-700'
          } flex items-center gap-3`}
        >
          <span className="text-sm font-medium">{status.message}</span>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-6 mt-6">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            width={1280}
            height={720}
          />
          
          {!isReady && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-xl flex items-center gap-2">
                <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Initializing camera...
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={storeFace}
            disabled={!isReady}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              !isReady
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Store Face
          </button>
          <button
            onClick={toggleVerification}
            disabled={!isReady || !storedFaceData}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              !isReady || !storedFaceData
                ? 'bg-gray-400 cursor-not-allowed'
                : isVerifying
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isVerifying ? 'Stop Verification' : 'Start Verification'}
          </button>
          <button
            onClick={handleRetry}
            disabled={!error && isReady}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              !error && isReady
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Retry Connection
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Troubleshooting:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Ensure your camera is connected and working</li>
            <li>Grant camera permissions when prompted</li>
            <li>Try using a different browser (Chrome recommended)</li>
            <li>Check your internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;