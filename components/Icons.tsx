type P = { className?: string };
const s = (className?: string) => ({ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className });

export const Check = ({ className }: P) => (<svg {...s(className)}><path d="M20 6 9 17l-5-5" /></svg>);
export const Phone = ({ className }: P) => (<svg {...s(className)}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const Pin = ({ className }: P) => (<svg {...s(className)}><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const Mail = ({ className }: P) => (<svg {...s(className)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const Clock = ({ className }: P) => (<svg {...s(className)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Star = ({ className }: P) => (<svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8-4.2-4.1 5.8-.8z" /></svg>);

const icons: Record<string, JSX.Element> = {
  oil: <><path d="M3 13h18M5 13l1.5-5h11L19 13M7 17a2 2 0 1 0 .01 0M17 17a2 2 0 1 0 .01 0" /></>,
  tire: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  brake: <><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
  ac: <><path d="M4 12a8 8 0 0 1 16 0M8 12a4 4 0 0 1 8 0" /><path d="M12 12v6" /></>,
  belt: <><path d="M6 4v16M6 8h9l3 4-3 4H6" /></>,
  battery: <><rect x="4" y="8" width="16" height="10" rx="2" /><path d="M8 8V6h8v2M9 12h2M15 12h.01" /></>,
  engine: <><path d="M12 3v6M8 7l4 2 4-2M5 12c0 4 3 9 7 9s7-5 7-9c0-2-2-3-4-2l-3 1-3-1c-2-1-4 0-4 2Z" /></>,
  diag: <><path d="M4 6h16v11H4zM4 17l4 3M20 17l-4 3M9 10l2 2 4-4" /></>,
};
export const ServiceIcon = ({ name, className }: { name: string; className?: string }) => (
  <svg {...s(className)}>{icons[name] ?? icons.diag}</svg>
);
