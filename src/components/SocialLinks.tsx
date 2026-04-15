'use client';

import { useEffect, useState } from 'react';
import { toggleDarkMode } from '@/utils/darkmode';
import { FaMoon, FaSun, FaLink, FaLinkedin, FaGithub } from 'react-icons/fa';

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
          <FaMoon className="text-fill-color text-xl" size={21} />
        ) : (
          <FaSun className="text-fill-color text-xl" size={21} />
        )}
      </button>

      <a
        href="https://link.nekowawolf.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        <FaLink className="text-fill-color" size={21} />
      </a>

      <a
        href="https://www.youtube.com/watch?v=IejbZAHcf4g"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        <FaLinkedin className="text-fill-color" size={21} />
      </a>

      <a
        href="https://github.com/nekowawolf"
        target="_blank"
        rel="noopener noreferrer"
        className="card-color w-full h-12 sm:w-12 sm:h-12 rounded-md border border-color flex justify-center items-center text-fill-color text-xl"
      >
        <FaGithub className="text-fill-color" size={21} />
      </a>
    </div>
  );
}