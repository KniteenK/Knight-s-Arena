import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  
  const auth = getAuth(app);
  const db = getDatabase(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save user info in the realtime database
      set(ref(db, 'users/' + user.uid), {
        username: user.displayName,
        email: user.email,
        profile_picture: user.photoURL,
      });

      navigate('/Home');
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(db, 'users/' + userCredential.user.uid), {
          username: username,
          email: email,
        });
      }
      navigate('/Home');
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'signing up'}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white">Knight's Arena</h1>
        </div>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLogin && (
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-400">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-gray-400 hover:underline">Forgot Password?</a>
          </div>
        )}
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAuth}
        >
          {isLogin ? 'Log In' : 'Sign Up'}
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
          <a
            href="#"
            className="text-gray-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'New? Sign up - and start playing chess!' : 'Already have an account? Log In'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
