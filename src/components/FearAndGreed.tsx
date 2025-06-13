'use client';

import { useEffect, useState } from 'react';

export default function FearAndGreed() {
  const [fngData, setFngData] = useState({
    value: '--',
    classification: '--',
    nextUpdate: '--'
  });

  useEffect(() => {
    const fetchFngData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_FEAR_GREED_API_URL;
        if (!apiUrl) throw new Error('Fear & Greed API URL not configured');
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        const { value, value_classification, time_until_update } = data.data[0];
        setFngData({
          value: `${value} (${value_classification})`,
          classification: value_classification,
          nextUpdate: `Next update: ${formatTime(time_until_update)}`
        });

        startCountdown(time_until_update);
      } catch (error) {
        console.error('Error fetching Fear and Greed Index data:', error);
      }
    };

    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    const startCountdown = (initialSeconds: number) => {
      let remainingSeconds = initialSeconds;

      const updateCountdown = () => {
        if (remainingSeconds >= 0) {
          setFngData(prev => ({
            ...prev,
            nextUpdate: `Next update: ${formatTime(remainingSeconds)}`
          }));
          remainingSeconds--;
        } else {
          clearInterval(interval);
          setFngData(prev => ({
            ...prev,
            nextUpdate: 'Fetching new data...'
          }));
          fetchFngData();
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    };

    fetchFngData();
  }, []);

  const getTextColor = () => {
    if (fngData.classification.includes('Greed')) return 'text-green-600';
    if (fngData.classification.includes('Fear')) return 'text-red-600';
    return 'text-yellow-500';
  };

  return (
    <div className="mb-2 p-2 card-color2 rounded">
      <p className="text-xs font-semibold mb-1">Fear & Greed Index</p>
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-fill-color">
          Current: <span className={getTextColor()}>{fngData.value}</span>
        </span>
        <span className="text-fill-color/50">{fngData.nextUpdate}</span>
      </div>
    </div>
  );
}