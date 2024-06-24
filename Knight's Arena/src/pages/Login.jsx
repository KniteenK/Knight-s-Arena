import React from 'react';
import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/Home');
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white">Knight's Arena</h1>
        </div>
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-400">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-gray-400 hover:underline">Forgot Password?</a>
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {}}
        >
          Log In
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleGoogleLogin}
        >
          Log in with Google
        </button>
        <button className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2">
          Log in with Apple
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-2">
          Log in with Facebook
        </button>
        <div className="text-center mt-4">
          <a href="/Signup" className="text-gray-400 hover:underline">
            New? Sign up - and start playing chess!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
