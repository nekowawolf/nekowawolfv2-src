'use client';

import { useEffect, useState } from 'react';

interface GasTrackerProps {
  onTimerUpdate: (timer: string) => void;
}

export default function GasTracker({ onTimerUpdate }: GasTrackerProps) {
  const [gasData, setGasData] = useState({
    safe: '--',
    propose: '--',
    fast: '--'
  });

  const updateTimerDisplay = (seconds: number) => {
    const display = `00:${seconds < 10 ? '0' : ''}${seconds}`;
    onTimerUpdate(`Gwei updates in: ${display}`);
  };

  const fetchGasData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ETHERSCAN_API_URL}/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      );
      const data = await response.json();

      setGasData({
        safe: parseFloat(data.result.SafeGasPrice).toFixed(3),
        propose: parseFloat(data.result.ProposeGasPrice).toFixed(3),
        fast: parseFloat(data.result.FastGasPrice).toFixed(3)
      });
    } catch (error) {
      console.error('Error fetching gas data:', error);
    }
  };

  const resetTimer = () => {
    let seconds = 10;
    updateTimerDisplay(seconds);

    const countdown = setInterval(() => {
      seconds--;
      updateTimerDisplay(seconds);

      if (seconds === 0) {
        clearInterval(countdown);
        resetTimerAndFetchData();
      }
    }, 1000);

    return countdown;
  };

  const resetTimerAndFetchData = () => {
    fetchGasData();
    resetTimer();
  };

  useEffect(() => {
    resetTimerAndFetchData();
    onTimerUpdate('Gwei updates in: --');

    return () => {
      
    };
  }, [onTimerUpdate]);

  return (
    <>
      <div className="mb-2 p-2 card-color2 rounded">
        <p className="text-xs font-semibold mb-1">ETH Gas Tracker</p>
        <div className="flex justify-between text-[11px]">
          <span className="text-green-600">Low: {gasData.safe}</span>
          <span className="text-yellow-600">Avg: {gasData.propose}</span>
          <span className="text-red-600">High: {gasData.fast}</span>
        </div>
      </div>
    </>
  );
}