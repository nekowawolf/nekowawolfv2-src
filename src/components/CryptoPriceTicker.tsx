'use client';

import { useEffect, useRef } from 'react';

export default function CryptoPriceTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionXRef = useRef<number>(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/airdrop/price`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        const assets = [
          { key: 'btc', label: 'BTC' },
          { key: 'eth', label: 'ETH' },
          { key: 'sol', label: 'SOL' },
          { key: 'bnb', label: 'BNB' },
          { key: 'matic', label: 'MATIC' },
          { key: 'xrp', label: 'XRP' }
        ];

        let html = '';
        assets.forEach(asset => {
          const coin = data[asset.key];
          if (!coin || !coin.price_usd) return;

          const price = parseFloat(coin.price_usd).toLocaleString();
          const percentChange = parseFloat(coin.percent_change_24h); 
          const formattedChange = percentChange.toFixed(2);
          const percentClass = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
          const symbol = percentChange >= 0 ? '+' : '';

          html += `
            <span style="margin-right: 20px;">
              ${asset.label}: <span class="font-semibold">$${price}</span>, 24h:
              <span class="${percentClass} font-semibold">${symbol}${formattedChange} %</span>
            </span>
          `;
        });

        if (tickerRef.current) {
          tickerRef.current.innerHTML = html + html;
          startAnimation();
        }
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    const startAnimation = () => {
      if (!tickerRef.current) return;

      cancelAnimationFrame(animationRef.current);
      const wrapper = tickerRef.current.parentElement;
      if (!wrapper) return;

      const wrapperWidth = wrapper.clientWidth;
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

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={tickerRef}
        className="whitespace-nowrap flex gap-1 sm:gap-2 items-center"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
