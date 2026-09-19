interface FlagProps {
  className?: string;
}

/** Simplified Brazil flag */
export function FlagBR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="Brasil">
      <rect width="24" height="16" fill="#009b3a" />
      <path d="M12 2.2 22.4 8 12 13.8 1.6 8z" fill="#fedf00" />
      <circle cx="12" cy="8" r="3.6" fill="#002776" />
      <path
        d="M8.7 7.1c1.5-.9 4.5-1 6.6.3"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Simplified United States flag */
export function FlagUS({ className }: FlagProps) {
  const stripeHeight = 16 / 13;
  const stripes = [0, 2, 4, 6, 8, 10, 12].map((index) => index * stripeHeight);

  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="United States">
      <rect width="24" height="16" fill="#ffffff" />
      <g fill="#b22234">
        {stripes.map((y) => (
          <rect key={y} y={y} width="24" height={stripeHeight} />
        ))}
      </g>
      <rect width="10.5" height={stripeHeight * 7} fill="#3c3b6e" />
      <g fill="#ffffff">
        {[1.6, 3.5, 5.4].map((cy) =>
          [1.5, 3.6, 5.7, 7.8, 9.9].map((cx) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.55" />
          )),
        )}
      </g>
    </svg>
  );
}