
import React, { useState, useRef, useEffect } from 'react';
import { VolumeOffIcon, VolumeUpIcon } from './icons';

const VSLPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const currentlyMuted = !videoRef.current.muted;
      videoRef.current.muted = currentlyMuted;
      setIsMuted(currentlyMuted);
    }
  };
  
  // A simple placeholder video. In a real scenario, this would come from Cloudflare Stream or Bunny.net.
  const videoSrc = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
        // Attempt to play the video automatically.
        videoElement.play().catch(error => {
            console.warn("Autoplay was prevented:", error);
            // In some browsers, autoplay is blocked until user interaction.
            // The user can still unmute to start playback.
        });
    }
  }, []);


  return (
    <div 
      className="relative w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-gray-800"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoSrc}
        playsInline
        autoPlay
        muted={isMuted}
        loop
      />
      <div 
        className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm text-white p-3 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </button>
      </div>
    </div>
  );
};

export default VSLPlayer;
