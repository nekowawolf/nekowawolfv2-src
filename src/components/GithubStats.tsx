'use client';

interface GithubStatsProps {
  username: string;
}

export default function GithubStats({ username }: GithubStatsProps) {
  const customTitle = `${username}'s GitHub Stats`;

  const url =
    `https://github-readme-stats-eta-one-93.vercel.app/api` +
    `?username=${username}` +
    `&show_icons=true` +
    `&theme=blue_navy` +
    `&rank_icon=github` +
    `&bg_color=00000000` +
    `&hide_border=true` +   
    `&icon_color=0969DA` +
    `&title_color=0969DA` +
    `&custom_title=${encodeURIComponent(customTitle)}`;

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={url}
        alt="GitHub Stats"
         className="
                w-[85%]          
                max-w-[260px]    
                md:w-[100%]      
                md:max-w-[450px] 
                h-auto
                object-contain
            "
      />
    </div>
  );
}