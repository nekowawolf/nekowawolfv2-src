'use client';

import { useEffect, useState } from 'react';
import SocialLinks from '@/components/SocialLinks';
import GasTracker from '@/components/GasTracker';
import FearAndGreed from '@/components/FearAndGreed';
import CryptoPriceTicker from '@/components/CryptoPriceTicker';
import ImageSwitcher from '@/components/ImageSwitcher';
import StatsCard from '@/components/StatsCard';
import { fetchStats } from '@/utils/fetchStats';

export default function Home() {
  const [stats, setStats] = useState({ communityCount: '--', airdropCount: '--' });
  const [gasTimer, setGasTimer] = useState('Gwei updates in: --');

  useEffect(() => {
    const loadStats = async () => {
      const { communityCount, airdropCount } = await fetchStats();
      setStats({ communityCount, airdropCount });
    };
    loadStats();
  }, []);

  return (
    <div className="body-color p-4 sm:p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-[1200px] w-full flex flex-col gap-4 sm:gap-6 my-auto">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 md:w-[600px]">
            <SocialLinks />
            
            <div className="flex flex-col gap-3 sm:gap-4 flex-1">
              <div className="w-full sm:min-w-[500px] card-color border border-color rounded-md p-3 sm:p-4 text-fill-color text-xs sm:text-[13px] leading-tight h-full">
                <h2 className="font-semibold mb-2 mt-0 sm:mt-3 text-sm sm:text-[14px]">
                  About Me
                </h2>
                <p>
                  Hi, I am an Informatics Engineering student with expertise in
                  Golang, SQL, PostgreSQL, MongoDB, Tailwind CSS, and frontend
                  development. Additionally, I have experience in UI/UX design
                  using Figma and Canva. I am also interested in Web3, crypto, and
                  airdrop.
                </p>
              </div>

              <div className="w-full max-w-[640px] h-10 card-color border border-color rounded-md p-2 sm:p-3 text-[11px] sm:text-[12px] text-fill-color flex items-center overflow-hidden">
                <CryptoPriceTicker />
              </div>
            </div>
          </div>

          <div className="rounded-md w-full md:w-[600px] h-[140px] sm:h-[180px] md:h-[215px]">
            <img
              src="https://media1.tenor.com/m/nM1Gd8L4ayYAAAAd/rina-tennoji-love-live.gif"
              alt="Profile Image"
              className="rounded-md w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="w-full md:w-[250px] h-[180px] sm:h-[215px] md:h-auto">
            <ImageSwitcher
              alt="Profile Image 2"
              className="rounded-md w-full h-full object-cover border border-color"
              darkSrc="/img/neko1.png"
              lightSrc="/img/neko2.png"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
            <div className="card-color border border-color rounded-md p-3 sm:p-4 text-fill-color">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs sm:text-sm font-medium text-blue-500">
                  Information
                </span>
                <span className="text-[10px] text-fill-color/50">Live Updates</span>
              </div>

              <GasTracker onTimerUpdate={setGasTimer} />
              <FearAndGreed />
              
              <div className="text-[10px] text-fill-color/60 flex justify-between">
                <span>{gasTimer}</span>
                <span>
                  Price updates in:
                  <span className="text-blue-500"> 5 min</span>
                </span>
              </div>
            </div>

            <div className="card-color border border-color rounded-md p-3 sm:p-4 text-fill-color relative overflow-hidden flex items-center justify-center min-h-48">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm sm:text-base font-medium mb-1">COMING SOON</p>
                <p className="text-xs text-fill-color/60">Feature in development</p>
              </div>
            </div>

            <StatsCard 
              title="Airdrop" 
              link="https://airdrop.nekowawolf.xyz" 
              description="Curated list of ongoing airdrops sourced from verified channels, X (Twitter), Medium, and official announcements."
              count={stats.airdropCount}
            />

            <StatsCard 
              title="Community" 
              link="https://nekowawolf.xyz/community-list/" 
              description="Curated list of crypto communities you can join, sourced from trusted platforms, forums, and official groups."
              count={stats.communityCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}