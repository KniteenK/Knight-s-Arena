import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="w-full bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Knight's Arena</div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
            <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Logout</button>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        {children}
      </main>
      <footer className="w-full bg-gray-800 p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Knight's Arena. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
