import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Building2, MapPin, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen flex font-Teachers bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <div className="w-[1.5px] h-screen bg-gray-300 dark:bg-gray-700" />
      <Outlet />
    </div>
  ),
})

function Sidebar() {
  const navLinks = [
    { name: 'Properties', id: 'home', icon: Building2, location: '/' },
  ]
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark') ? true : false,
  )

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="p-4 flex flex-col">
      <div className="flex font-Teachers justify-start items-center gap-2">
        <MapPin className="size-8" />
        <h1 className="text-xl font-semibold">PropertyHub</h1>
      </div>
      <div className="h-8" />
      <nav className="w-60 flex-1">
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

      <div>
        <button
          className="rounded-sm dark:bg-gray-700 bg-gray-400 p-2 px-4 pr-20 flex items-center gap-5 hover:bg-gray-500 transition-all cursor-pointer w-full"
          onClick={toggleDarkMode}
        >
          {isDark ? (
            <>
              <Moon />
              <p>Dark</p>
            </>
          ) : (
            <>
              <Sun />
              <p>Light</p>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
