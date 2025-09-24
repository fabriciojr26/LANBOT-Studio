
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
        <span className="bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
          TV de R$200 por apenas R$10?
        </span>
        <br />
        O jogo mudou.
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        Assista esse vídeo antes que tirem do ar.
      </p>
    </header>
  );
};

export default HeroSection;
