import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "LASIK", href: "/services/lasik-surgery" },
  { name: "Awards", href: "/awards" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img alt="Galaxy Eye Hospital" className="h-14 object-contain" src="/logo.png" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[hsl(var(--primary))] relative group ${
                  isActive ? "text-[hsl(var(--primary))]" : "text-gray-600"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[hsl(var(--accent))] transition-all duration-300 group-hover:w-full ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:+918087808797`} className="flex items-center gap-2 text-[hsl(var(--primary))] font-semibold text-sm hover:text-[hsl(var(--accent))] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
            <span>8087808797</span>
          </a>
          <Link to="/contact" className="px-4 py-2 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white text-sm font-medium rounded-md shadow-lg shadow-[hsl(var(--primary))]/20 transition-all hover:-translate-y-0.5">
            Book Appointment
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-[hsl(var(--primary))] py-2">
              {link.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="block w-full px-4 py-2 bg-[hsl(var(--primary))] text-white text-sm font-medium rounded-md mt-2 text-center">
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
}
