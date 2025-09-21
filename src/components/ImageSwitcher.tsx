'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  alt: string;
  className?: string;
  darkSrc: string; 
  lightSrc: string; 
};

export default function ImageSwitcher({ alt, className, darkSrc, lightSrc }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkActive = document.documentElement.classList.contains('darkmode');
    setIsDark(darkActive);

    const observer = new MutationObserver(() => {
      const active = document.documentElement.classList.contains('darkmode');
      setIsDark(active);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDark ? darkSrc : lightSrc}
      alt={alt}
      width={400}
      height={400}
      className={className}
    />
  );
}
