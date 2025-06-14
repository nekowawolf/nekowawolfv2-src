'use client';

import { useEffect, useRef } from 'react';

const textArray = [
  'page not found',
  'but, are you airdrop farmers?',
  'if yes, click the wolf!',
  'if no, ctrl+w'
];

export default function NotFound() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70;
    const deletingSpeed = 50;
    const delayBetweenWords = 3000;
    let timeout: NodeJS.Timeout;

    function type() {
      const currentText = textArray[textIndex];
      if (textRef.current) {
        textRef.current.textContent = isDeleting
          ? currentText.substring(0, charIndex--)
          : currentText.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentText.length + 1) {
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, delayBetweenWords / 2);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
      }

      timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
  <div className="bg-gray-900 flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-6xl mb-7 font-bold text-white">:(</h1>
      <h1 className="text-9xl mb-2 font-bold text-blue-300">404</h1>

      <div style={{ minHeight: '30px' }}>
        <p
          ref={textRef}
          className="text-white mb-3 blinking-cursor"
          style={{ display: 'inline-block' }}
        />
      </div>

      <a href="https://nekowawolf.xyz/airdrop" className="inline-block mb-4">
        <img
          src="/img/nww.png"
          alt="Wolf Logo"
          className="w-10 mt-7 h-auto mx-auto"
        />
      </a>

      <img
        src="/img/blue5.png"
        alt=""
        className="w-52 sm:w-48 bg-center sm:ml-10 ml-7 mt-7 h-auto mx-auto fixed -bottom-16 sm:-bottom-24"
      />
    </div>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
      body, .bg-gray-900 {
        font-family: 'Montserrat', sans-serif;
      }
      .blinking-cursor::after {
        content: '|';
        margin-left: 8px;
        animation: blink 1s step-start infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `}</style>
  </div>
  );
}
