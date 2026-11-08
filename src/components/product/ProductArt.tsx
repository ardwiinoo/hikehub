import { getColorHex } from '../../lib/catalog'
import type { Category, Color } from '../../types/product'

interface ProductArtProps {
  category: Category
  color: Color
  className?: string
}

const OUTLINE = { stroke: 'rgb(0 0 0 / 0.18)', strokeWidth: 1.5, strokeLinejoin: 'round' } as const
const JACKET =
  'M72 42 L86 34 Q100 46 114 34 L128 42 L162 70 L176 138 L158 144 L146 98 L146 168 L54 168 L54 98 L42 144 L24 138 L38 70 Z'
const HOOD = 'M86 34 Q100 10 114 34 Q100 46 86 34 Z'
const VEST =
  'M72 42 L86 34 Q100 46 114 34 L128 42 L136 62 Q130 84 146 98 L146 168 L54 168 L54 98 Q70 84 64 62 Z'

function Jacket({ fill, variant }: { fill: string; variant: 'shell' | 'wind' | 'ski' }) {
  return (
    <g>
      <path d={JACKET} fill={fill} {...OUTLINE} />
      <path d={HOOD} fill={fill} {...OUTLINE} />
      <path d={HOOD} fill="rgb(0 0 0 / 0.15)" />
      {variant === 'wind' && (
        <path d="M54 136 L146 112 L146 168 L54 168 Z" fill="rgb(0 0 0 / 0.18)" />
      )}
      {variant === 'ski' && <path d="M38 90 H162 L164 102 H36 Z" fill="rgb(255 255 255 / 0.45)" />}
      <path d="M100 44 V168" stroke="rgb(0 0 0 / 0.3)" strokeWidth="2" />
      <path d="M62 120 H86 M114 120 H138" stroke="rgb(0 0 0 / 0.2)" strokeWidth="2" />
    </g>
  )
}

function Vest({ fill }: { fill: string }) {
  return (
    <g>
      <path d={VEST} fill={fill} {...OUTLINE} />
      {[80, 102, 124, 146].map((y) => (
        <path key={y} d={`M56 ${String(y)} H144`} stroke="rgb(0 0 0 / 0.15)" strokeWidth="2" />
      ))}
      <path d="M100 44 V168" stroke="rgb(0 0 0 / 0.3)" strokeWidth="2" />
    </g>
  )
}

function Shoe({ fill, high }: { fill: string; high: boolean }) {
  const upper = high
    ? 'M34 128 Q32 100 50 96 L70 92 L76 58 Q98 50 118 58 L120 84 Q134 100 158 106 Q178 112 176 132 L34 132 Z'
    : 'M32 128 Q30 104 48 100 L84 92 Q96 78 116 80 L126 82 Q132 100 156 106 Q178 112 176 132 L32 132 Z'
  return (
    <g>
      <path d={upper} fill={fill} {...OUTLINE} />
      <path
        d="M28 130 H180 V142 Q180 150 172 150 H36 Q28 150 28 142 Z"
        fill={high ? '#3f3f46' : '#f4f4f5'}
        {...OUTLINE}
      />
      <path
        d={high ? 'M96 64 L104 92 M88 72 L112 70 M90 82 L114 80' : 'M98 84 L108 100 M92 92 L116 88'}
        stroke="rgb(255 255 255 / 0.7)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  )
}

/** Placeholder illustration tinted with the product color. Swap for real photos when available. */
export function ProductArt({ category, color, className }: ProductArtProps) {
  const fill = getColorHex(color)

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {category === 'hardshell-jackets' && <Jacket fill={fill} variant="shell" />}
      {category === 'windbreaker' && <Jacket fill={fill} variant="wind" />}
      {category === 'ski-snowboard-jackets' && <Jacket fill={fill} variant="ski" />}
      {category === 'vests' && <Vest fill={fill} />}
      {category === 'casual-shoes' && <Shoe fill={fill} high={false} />}
      {category === 'hiking-shoes' && <Shoe fill={fill} high />}
    </svg>
  )
}
