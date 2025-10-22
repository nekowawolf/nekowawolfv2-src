'use client';

import { useEffect, useState } from 'react';
import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface CoinData {
  [key: string]: {
    price_usd: string;
    percent_change_24h: string;
  };
}

export default function CryptoPriceTicker() {
  const [data, setData] = useState<CoinData | null>(null);
  const [isReady, setIsReady] = useState(false);

  const assets = [
    { key: 'btc', label: 'BTC' },
    { key: 'eth', label: 'ETH' },
    { key: 'sol', label: 'SOL' },
    { key: 'bnb', label: 'BNB' },
    { key: 'matic', label: 'MATIC' },
    { key: 'xrp', label: 'XRP' },
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/airdrop/price`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
        setIsReady(true);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-8 overflow-hidden flex items-center justify-center">
      {!isReady ? (
        <Spinner variant="ellipsis" className="text-fill-color" />
      ) : (
        data && (
          <div className="ticker-wrapper">
            <div className="ticker-inner">
              {[...assets, ...assets].map((asset, index) => {
                const coin = data?.[asset.key];
                if (!coin || !coin.price_usd) return null;

                const price = parseFloat(coin.price_usd).toLocaleString();
                const percentChange = parseFloat(coin.percent_change_24h);
                const formattedChange = percentChange.toFixed(2);
                const percentClass = percentChange >= 0 ? "text-green-500" : "text-red-500";
                const symbol = percentChange >= 0 ? "+" : "";

                return (
                  <span
                    key={`${asset.key}-${index}`}
                    className="ticker-item flex items-center"
                    style={{ lineHeight: "1" }}
                  >
                    {asset.label}:{" "}
                    <span className="font-semibold ml-2">${price},</span>
                    <span className="ml-2">24h:</span>
                    <span className={`ml-2 ${percentClass} font-semibold`}>
                      {symbol}{formattedChange}%
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )
      )}

      <style jsx>{`
        .ticker-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .ticker-inner {
          position: absolute;
          display: inline-flex;
          white-space: nowrap;
          animation: tickerScroll 40s linear infinite;
        }

        .ticker-item {
          flex-shrink: 0;
          padding: 0 0.75rem;
        }

        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}