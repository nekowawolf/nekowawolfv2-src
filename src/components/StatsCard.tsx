import Link from 'next/link';

interface StatsCardProps {
  title: string;
  link: string;
  description: string;
  count: string;
}

export default function StatsCard({ title, link, description, count }: StatsCardProps) {
  return (
    <div className="card-color border border-color rounded-md p-3 sm:p-4 text-fill-color">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm md:text-base flex items-center gap-1.5">
          <span>{title}</span>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fill-color/70 hover:text-fill-color transition-colors"
            aria-label={`${title} external link`}
          >
            <i className="fas fa-external-link-alt text-xs"></i>
          </Link>
        </h3>
        <span className="text-[10px] bg-blue-300 text-blue-700 px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>
      <p className="text-xs md:text-sm text-fill-color/80 leading-relaxed mb-3">
        {description}
      </p>
      <div className="flex items-center justify-end text-[11px] text-fill-color/60 border-t border-white/10 pt-2">
        <div className="flex items-center gap-1">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
}