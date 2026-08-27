type LogoProps = {
  variant?: "color" | "white";
  className?: string;
};

export function Logo({ variant = "color", className }: LogoProps) {
  const src = `/logo/nugget-logo-${variant}.svg`;
  return <img src={src} alt="nugget." width={140} height={50} className={className} />;
}
