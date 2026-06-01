export const NewTab = ({ className }: { className: string }) => (
    <svg viewBox="0 0 18 18" fill="none" className={className}>
        <rect x="1" y="6" width="10" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="9" width="5" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
        <rect x="3" y="12" width="3" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
        <line x1="10" y1="8" x2="16" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="12,1 17,1 17,6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
