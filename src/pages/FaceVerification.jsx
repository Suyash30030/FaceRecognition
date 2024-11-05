import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

const FaceVerification = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState({ type: 'info', message: 'Initializing...' });
  const [capturedImage, setCapturedImage] = useState(null);
  const [comparisonImage, setComparisonImage] = useState(null);
  const [isFaceMatch, setIsFaceMatch] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // Load the BlazeFace model
  const loadFaceLandmarksModel = async () => {
    const loadedModel = await blazeface.load();
    setModel(loadedModel);
    console.log('Model loaded');
    setStatus({ type: 'success', message: 'Model loaded' });
  };

  useEffect(() => {
    loadFaceLandmarksModel();
  }, []);

  const detectFaces = async (image) => {
    if (model) {
      const predictions = await model.estimateFaces(image, false);
      return predictions;
    }
    return [];
  };

  const compareImages = async () => {
    const capturedImageData = localStorage.getItem('capturedImage');
    if (capturedImageData) {
      setComparisonImage(capturedImageData);
      const capturedImage = new Image();
      capturedImage.src = capturedImageData;
      await capturedImage.decode();

      const liveImage = new Image();
      liveImage.src = webcamRef.current.getScreenshot();
      await liveImage.decode();

      const capturedFaces = await detectFaces(capturedImage);
      const liveFaces = await detectFaces(liveImage);

      if (capturedFaces.length > 0 && liveFaces.length > 0) {
        // Compare the largest face from the captured image with the largest face from the live feed
        const capturedFace = capturedFaces[0];
        const liveFace = liveFaces[0];

        const capturedFaceBox = capturedFace.topLeft.concat(capturedFace.bottomRight);
        const liveFaceBox = liveFace.topLeft.concat(liveFace.bottomRight);

        const iou = calculateIoU(capturedFaceBox, liveFaceBox);
        const confidence = iou * 100;
        setConfidence(confidence);
        if (confidence > 50) { // Adjust the threshold as needed
          setStatus({ type: 'success', message: 'Faces match!' });
          setIsFaceMatch(true);
        } else {
          setStatus({ type: 'error', message: 'Faces do not match.' });
          setIsFaceMatch(false);
        }
        setShowComparisonModal(true);
      } else {
        setStatus({ type: 'info', message: 'No faces detected.' });
        setIsFaceMatch(false);
      }
    } else {
      setStatus({ type: 'info', message: 'No captured image available.' });
      setIsFaceMatch(false);
    }
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    localStorage.setItem('capturedImage', imageSrc);
    setStatus({ type: 'success', message: 'Image captured.' });
  };

  const closeComparisonModal = () => {
    setShowComparisonModal(false);
  };

  const calculateIoU = (box1, box2) => {
    const [x1, y1, x2, y2] = box1;
    const [x3, y3, x4, y4] = box2;

    const interLeft = Math.max(x1, x3);
    const interTop = Math.max(y1, y3);
    const interRight = Math.min(x2, x4);
    const interBottom = Math.min(y2, y4);

    const interArea = Math.max(0, interRight - interLeft) * Math.max(0, interBottom - interTop);
    const box1Area = (x2 - x1) * (y2 - y1);
    const box2Area = (x4 - x3) * (y4 - y3);
    const unionArea = box1Area + box2Area - interArea;

    return interArea / unionArea;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex justify-center items-center mt-14">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Face Verification</h1>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700 font-medium mb-2">Status:</p>
          <div
            className={`p-2 rounded-lg ${
              status.type === 'error'
                ? 'bg-red-100 border border-red-500 text-red-700'
                : status.type === 'success'
                ? 'bg-green-100 border border-green-500 text-green-700'
                : 'bg-blue-100 border border-blue-500 text-blue-700'
            }`}
          >
            {status.message}
          </div>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-6">
          <Webcam
            ref={webcamRef}
            className="w-full h-full object-cover"
            audio={false}
            screenshotFormat="image/jpeg"
          />
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={captureImage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Capture Image
          </button>
          <button
            onClick={compareImages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Compare
          </button>
        </div>

        {showComparisonModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
              <div className="flex justify-center space-x-4">
                <div className="relative">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className={`w-full max-w-md rounded-xl ${
                      isFaceMatch
                        ? 'border-4 border-green-500 hover:border-green-700'
                        : 'border-4 border-red-500 hover:border-red-700'
                    }`}
                  />
                  <div
                    className={`absolute top-2 left-2 bg-white px-2 py-1 rounded-lg ${
                      isFaceMatch ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                    }`}
                  >
                    {isFaceMatch ? 'Match' : 'No Match'}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={webcamRef.current.getScreenshot()}
                    alt="Live Feed"
                    className="w-full max-w-md rounded-xl"
                  />
                  <div
                    className={`absolute top-2 left-2 bg-white px-2 py-1 rounded-lg ${
                      isFaceMatch ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                    }`}
                  >
                    {confidence.toFixed(2)}% Confidence
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeComparisonModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
    
  );
};

export default FaceVerification;