'use client';

import { useEffect, useState } from 'react';
import { toggleDarkMode } from '@/utils/darkmode';

export default function SocialLinks() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem('darkmode') === 'active';
    setIsDarkMode(current);
    
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
      const handler = () => {
        toggleDarkMode();
        setIsDarkMode(prev => !prev);
      };
      themeSwitch.addEventListener('click', handler);
      return () => themeSwitch.removeEventListener('click', handler);
    }
  }, []);

  return (
    <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-center sm:justify-start px-0 sm:px-0">
      <button
        id="theme-switch"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl gap-1"
      >
        {isDarkMode ? (
          <i className="fas fa-sun text-fill-color text-xl" />
        ) : (
          <i className="fas fa-moon text-fill-color text-xl" />
        )}
      </button>

      <a
        href="https://x.com/intent/follow?screen_name=0xNekowawolf"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        {/* X Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 462.799"
          className="w-5 h-5 text-fill-color"
        >
          <path
            fillRule="nonzero"
            d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
          />
        </svg>
      </a>

      <a
        href="https://www.youtube.com/watch?v=IejbZAHcf4g"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        <i className="fab fa-linkedin text-fill-color"></i>
      </a>

      <a
        href="https://github.com/nekowawolf"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        <i className="fab fa-github text-fill-color"></i>
      </a>
    </div>
  );
}