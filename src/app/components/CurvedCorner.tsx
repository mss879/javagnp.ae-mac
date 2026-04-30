/**
 * CurvedCorner – the concave‑radius "notch" SVG used at the
 * intersections of the white nav badges and the hero container.
 *
 * Rotate with the `rotation` prop:
 *   0   = top‑left outside
 *   90  = top‑right outside
 *   180 = bottom‑right outside
 *   270 = bottom‑left outside
 */

interface CurvedCornerProps {
  size?: number;
  rotation?: number;
  fill?: string;
  className?: string;
}

export default function CurvedCorner({
  size = 24,
  rotation = 0,
  fill = "#ffffff",
  className = "",
}: CurvedCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute z-20 ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <path
        d={`M 0 0 L 0 ${size} A ${size} ${size} 0 0 1 ${size} 0 L 0 0 Z`}
        fill={fill}
      />
    </svg>
  );
}
