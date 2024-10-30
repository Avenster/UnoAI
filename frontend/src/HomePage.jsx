import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
const HomePage = ({ onStartGame }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000); // Show content after intro animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main min-h-screen flex flex-col items-center justify-center p-4">
      {/* Intro Animation */}
      {!showContent && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2 }}
          >
            UNO
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-white opacity-80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            by Ankur Kaushal
          </motion.p>
        </motion.div>
      )}

      {/* Main Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white p-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">
                Welcome to UNO
              </h1>
              <p className="text-xl text-gray-300">
                Experience the classic card game in a modern digital format
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-2">🎮 Game Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Play against AI opponent
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Classic UNO rules
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Beautiful card animations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Real-time game statistics
                  </li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-2">🎯 How to Play</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Match colors or numbers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Use special action cards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Draw cards when needed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Race to empty your hand!
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transition-shadow"
                onClick={onStartGame}
              >
                Start Playing Now!
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;