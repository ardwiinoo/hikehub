import { Link } from 'react-router'
import logo from '../../assets/images/logo.webp'
import logoLight from '../../assets/images/logo-light.webp'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="HikeHub beranda">
      <img src={light ? logoLight : logo} alt="" width={40} height={35} className="h-8 w-auto" />
      <span className={`text-lg font-extrabold tracking-tight ${light ? 'text-white' : ''}`}>
        HikeHub
      </span>
    </Link>
  )
}
