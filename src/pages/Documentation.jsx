import React from 'react';

const FaceVerificationDocumentation = () => {
  return (
    <div className="bg-gray-50 font-sans pb-12">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Face Recognition System</h1>
        
        <div className="bg-white overflow-hidden shadow-lg rounded-xl">
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Solution Overview</h2>
            <p className="mt-2 text-sm text-gray-600">
              Our face verification system uses TensorFlow.js and BlazeFace for real-time face detection and comparison. 
              The system captures facial images and compares them using Intersection over Union (IoU) metrics for verification.
            </p>
          </div>
          
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Technologies Used</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
              <li>React.js with Hooks for UI components</li>
              <li>TensorFlow.js for machine learning capabilities</li>
              <li>BlazeFace model for fast face detection</li>
              <li>WebcamJS for camera integration</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
          
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Project Structure</h2>
            <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap font-mono">
{`face-verification-app/
├── src/
│   ├── components/
│   │   └── FaceVerification.jsx
│   ├── utils/
│   │   └── faceDetection.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── tailwind.config.js`}</div>
          </div>
          
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Key Features</h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium text-gray-900 mt-4">1. Face Detection</h3>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
                  <li>Real-time face detection using BlazeFace</li>
                  <li>Automatic model loading and initialization</li>
                  <li>Face boundary box detection</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-medium text-gray-900">2. Image Capture</h3>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
                  <li>WebCam integration for live capture</li>
                  <li>Local storage for reference images</li>
                  <li>Screenshot functionality</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-medium text-gray-900">3. Face Verification</h3>
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
                  <li>IoU-based face comparison algorithm</li>
                  <li>Confidence score calculation</li>
                  <li>Visual comparison interface</li>
                </ul>
              </section>
            </div>
          </div>
          
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Implementation Details</h2>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-medium text-gray-900">Face Detection Process</h3>
                <p className="mt-2 text-sm text-gray-600">
                  The system uses the BlazeFace model to detect faces in both the stored reference image and the live webcam feed. 
                  It returns coordinates for face boundaries which are used for comparison.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-medium text-gray-900">Comparison Algorithm</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Face matching uses Intersection over Union (IoU) to compare face regions. 
                  A confidence score above 50% indicates a potential match, though this threshold can be adjusted.
                </p>
              </section>
            </div>
          </div>
          
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">External Resources</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6 space-y-2">
              <li>
                <a href="https://github.com/tensorflow/tfjs-models/tree/master/blazeface" className="text-blue-500 hover:text-blue-700">BlazeFace Model Documentation</a>
              </li>
              <li>
                <a href="https://www.tensorflow.org/js" className="text-blue-500 hover:text-blue-700">TensorFlow.js Documentation</a>
              </li>
              <li>
                <a href="https://github.com/mozmorris/react-webcam" className="text-blue-500 hover:text-blue-700">React Webcam Documentation</a>
              </li>
            </ul>
          </div>
          
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Future Improvements</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
              <li>Enhanced face matching algorithms beyond IoU</li>
              <li>Support for multiple face detection and comparison</li>
              <li>Integration with more sophisticated face recognition models</li>
              <li>Additional security features and liveness detection</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaceVerificationDocumentation;