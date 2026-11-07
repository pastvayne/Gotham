import Image from "next/image";

const ratio = 286 / 155;

export function Logo({
  size = 22,
  priority = false,
  className,
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const height = size;
  const width = Math.round(size * ratio);

  return (
    <Image
      src="/brand/gotham-mark.png"
      alt=""
      width={286}
      height={155}
      priority={priority}
      sizes={`${width}px`}
      className={className}
      style={{ width, height }}
    />
  );
}
