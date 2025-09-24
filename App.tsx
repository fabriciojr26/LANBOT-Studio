
import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import VSLPlayer from './components/VSLPlayer';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const CHATBOT_DELAY = 45000; // 45 seconds

const App: React.FC = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatbotVisible(true);
    }, CHATBOT_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans antialiased">
      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <HeroSection />
          <div className="my-6 md:my-8"></div>
          <VSLPlayer />
        </div>
      </main>
      <Footer />
      <Chatbot isVisible={isChatbotVisible} />
    </div>
  );
};

export default App;
