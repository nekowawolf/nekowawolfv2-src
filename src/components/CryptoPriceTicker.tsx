'use client';

import { useEffect, useRef, useState } from 'react';

interface CoinData {
  [key: string]: {
    price_usd: string;
    percent_change_24h: string;
  };
}

export default function CryptoPriceTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionXRef = useRef<number>(0);
  const [data, setData] = useState<CoinData | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const assets = [
    { key: 'btc', label: 'BTC' },
    { key: 'eth', label: 'ETH' },
    { key: 'sol', label: 'SOL' },
    { key: 'bnb', label: 'BNB' },
    { key: 'matic', label: 'MATIC' },
    { key: 'xrp', label: 'XRP' },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const fetchPrices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/airdrop/price`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    const startAnimation = () => {
      if (!tickerRef.current) return;

      cancelAnimationFrame(animationRef.current);
      const tickerWidth = tickerRef.current.scrollWidth / 2;
      positionXRef.current = 0;

      const animate = () => {
        positionXRef.current -= 0.5;
        if (positionXRef.current <= -tickerWidth) {
          positionXRef.current = 0;
        }
        if (tickerRef.current) {
          tickerRef.current.style.transform = `translateX(${positionXRef.current}px)`;
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    const timeout = setTimeout(() => startAnimation(), 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hasMounted]);

  if (!hasMounted) return null;

  return (
    <div className="overflow-hidden w-full relative h-full flex items-center">
      <div
        ref={tickerRef}
        className="absolute flex whitespace-nowrap gap-6 will-change-transform items-center"
      >
        {assets.concat(assets).map((asset, index) => {
          const coin = data?.[asset.key];
          if (!coin || !coin.price_usd) return null;

          const price = parseFloat(coin.price_usd).toLocaleString();
          const percentChange = parseFloat(coin.percent_change_24h);
          const formattedChange = percentChange.toFixed(2);
          const percentClass = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
          const symbol = percentChange >= 0 ? '+' : '';

          return (
            <span key={`${asset.key}-${index}`} className="shrink-0 text-nowrap">
              {asset.label}:{' '}
              <span className="font-semibold">${price}</span>, 24h:{' '}
              <span className={`${percentClass} font-semibold`}>
                {symbol}
                {formattedChange}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
