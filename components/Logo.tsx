type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logo/nugget-badge.png"
      alt="nugget."
      width={40}
      height={40}
      className={["aspect-square object-contain", className].filter(Boolean).join(" ")}
    />
  );
}
