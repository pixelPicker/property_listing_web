import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Building2, Heart, MapPin } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen flex font-Teachers bg-gray-100">
      <Sidebar />
      <div className="w-[1.5px] h-screen bg-gray-300" />
      <Outlet />
    </div>
  ),
})

function Sidebar() {
  const navLinks = [
    { name: 'Properties', id: 'home', icon: Building2, location: '/' },
    { name: 'Saved Listings', id: 'saved', icon: Heart, location: '/saved' },
  ]

  return (
    <div className="p-4">
      <div className="flex font-Teachers justify-start items-center gap-2">
        <MapPin className="size-8" />
        <h1 className="text-xl font-semibold">PropertyHub</h1>
      </div>

      <div className="h-8" />

      <nav className="w-60">
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.location}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: 'bg-gray-400/25 hover:bg-gray-400/25',
                }}
                className="rounded-sm p-2 px-4 pr-20 flex items-center gap-5 hover:bg-gray-400/10 transition-all cursor-pointer"
              >
                <link.icon className="size-5" /> <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
