import React from 'react';

const FaceRecognitionAppDocumentation = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-gray-900 mt-20">Face Recognition App Documentation</h1>
        </div>
      </header>

      <main className=" mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-lg rounded-xl">
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
            <p className="mt-2 text-sm text-gray-600">
              This documentation covers the setup and implementation of a face recognition application using ReactJS, Tailwind CSS, Raspberry Pi, and MediaPipe.
            </p>
          </div>
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Prerequisites</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
              <li>Raspberry Pi 4 Model B (or a compatible model)</li>
              <li>Raspberry Pi Camera Module V2</li>
              <li>Node.js (version 14 or later)</li>
              <li>npm (version 6 or later)</li>
            </ul>
          </div>
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Hardware Setup (Raspberry Pi)</h2>
            <ol className="mt-2 text-sm text-gray-600 list-decimal pl-6">
              <li>Connect the Raspberry Pi Camera Module V2 to your Raspberry Pi.</li>
              <li>Power on your Raspberry Pi and set it up according to the manufacturer's instructions.</li>
              <li>Ensure that you have the necessary drivers and libraries installed for the camera module.</li>
            </ol>
          </div>
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Software Setup</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-4">MediaPipe Installation</h3>
            <ol className="mt-2 text-sm text-gray-600 list-decimal pl-6">
              <li>Install the required dependencies for MediaPipe on your Raspberry Pi.</li>
              <li>Clone the MediaPipe repository and build the necessary components.</li>
            </ol>
            <h3 className="text-xl font-medium text-gray-900 mt-6">ReactJS and Tailwind CSS Setup</h3>
            <ol className="mt-2 text-sm text-gray-600 list-decimal pl-6">
              <li>Create a new React project using <code>create-react-app</code>.</li>
              <li>Install Tailwind CSS and its dependencies.</li>
              <li>Configure Tailwind CSS in your project's <code>tailwind.config.js</code> and <code>src/index.css</code> files.</li>
            </ol>
          </div>
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Application Development</h2>
            <h3 className="text-xl font-medium text-gray-900 mt-4">Project Structure</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-700">
              <code>
                my-facerecognition-app/
                ├── src/
                │   ├── components/
                │   │   ├── FaceDetection.js
                │   │   ├── FaceRecognition.js
                │   │   └── ...
                │   ├── utils/
                │   │   ├── mediapipe.js
                │   │   └── ...
                │   ├── App.js
                │   └── index.js
                ├── package.json
                └── ...
              </code>
            </pre>
            <h3 className="text-xl font-medium text-gray-900 mt-6">Core Components</h3>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
              <li><code>FaceDetection.js</code>: Handles the video stream capture and face detection using MediaPipe.</li>
              <li><code>FaceRecognition.js</code>: Implements the face recognition logic and displays the results.</li>
            </ul>
          </div>
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Deployment</h2>
            <p className="mt-2 text-sm text-gray-600">
              To deploy your face recognition app, you can use various hosting services like Netlify, Vercel, or GitHub Pages. Make sure to configure the necessary environment variables and build scripts in your <code>package.json</code> file.
            </p>
          </div>
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">API References</h2>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
              <li>
                MediaPipe API: <a href="https://google.github.io/mediapipe/solutions/solutions.html" className="text-blue-500 hover:text-blue-700">https://google.github.io/mediapipe/solutions/solutions.html</a>
              </li>
              <li>
                Raspberry Pi Camera Module V2 API: <a href="https://www.raspberrypi.com/documentation/computers/camera.html" className="text-blue-500 hover:text-blue-700">https://www.raspberrypi.com/documentation/computers/camera.html</a>
              </li>
              <li>
                React API: <a href="https://reactjs.org/docs/react-api.html" className="text-blue-500 hover:text-blue-700">https://reactjs.org/docs/react-api.html</a>
              </li>
              <li>
                Tailwind CSS API: <a href="https://tailwindcss.com/docs/utility-first" className="text-blue-500 hover:text-blue-700">https://tailwindcss.com/docs/utility-first</a>
              </li>
            </ul>
          </div>
          <div className="px-6 py-5 sm:p-8 bg-gray-50 border-t-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Troubleshooting</h2>
            <ol className="mt-2 text-sm text-gray-600 list-decimal pl-6">
              <li>
                If you encounter issues with MediaPipe installation, refer to the <a href="https://google.github.io/mediapipe/getting_started/install.html#install-on-raspberry-pi" className="text-blue-500 hover:text-blue-700">MediaPipe documentation</a> for troubleshooting steps.
              </li>
              <li>
                For any React or Tailwind CSS related issues, consult the official documentation or seek help from the community.
              </li>
            </ol>
          </div>
          <div className="px-6 py-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Conclusion</h2>
            <p className="mt-2 text-sm text-gray-600">
              By following this documentation, you should be able to set up and build a face recognition application using ReactJS, Tailwind CSS, Raspberry Pi, and MediaPipe. If you have any further questions or need additional assistance, feel free to reach out.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaceRecognitionAppDocumentation;
