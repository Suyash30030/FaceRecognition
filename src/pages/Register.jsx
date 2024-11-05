import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setStatus({
          type: 'success',
          message: 'Account created successfully!'
        });
        navigate('/');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setStatus({
          type: 'success',
          message: 'Logged in successfully!'
        });
        navigate('/');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-purple-600">
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegistering ? 'Enter your details to create an account' : 'Enter your details to sign in'}
          </p>
        </div>

        {status.message && (
          <div className={`rounded-md p-4 ${
            status.type === 'error' 
              ? 'bg-red-50 text-red-600 border border-red-300' 
              : 'bg-green-50 text-green-600 border border-green-300'
          }`}>
            <p className="text-sm">{status.message}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isRegistering && (
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : isRegistering ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"} {' '}
            <button 
              type="button" 
              className="text-purple-600 hover:text-purple-700"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}

export default AuthForm;
