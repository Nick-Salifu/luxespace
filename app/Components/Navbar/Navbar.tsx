"use client"

import Link from "next/link";
import { useEffect, useState } from "react";


type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/UI-Components/Pages/Services" },
  {
    label: "Projects",
    href: "/UI-Components/Projects",
    dropdown: [
      { label: "Projects", href: "/UI-Components/Projects" },
      { label: "Projects Details", href: "/UI-Components/Projects/2" },
    ],
  },
  {
    label: "Blog",
    href: "/UI-Components/Blogs",
    dropdown: [
      { label: "Blog", href: "/UI-Components/Blogs" },
      { label: "Blog Details", href: "/UI-Components/Blogs/2" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "About", href: "/UI-Components/Pages/About" },
      { label: "Team", href: "/UI-Components/Pages/Team" },
      { label: "Gallery", href: "/UI-Components/Pages/Gallery" },
      { label: "Contact", href: "/UI-Components/Pages/Contact" },
      { label: "Page 404", href: "/UI-Components/Pages/Page404" },
    ],
  },
  { label: "Contact Us", href: "/UI-Components/Pages/Contact" },
]


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => (prev[label] ? {} : { [label]: true }))
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <div className={`w-full transition-all bg-white duration-500 fixed top-0 left-0 z-100 ${isScrolled ? "bg-(--white) shadow-md" : "bg-transparent"}`}>
      <div className="flex items-center justify-between px-[8%] lg:px-[10%] py-5">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <Link href="/" className="text-4xl font-bold Audiowide text-(--black)">
            Luxe<span className="text-(--prim)">space</span>
          </Link>

          {/* Desktop Navlink */}
          <nav className="hidden lg:flex space-x-6 menu-link relative ms-10">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group z-50">
                  <Link href={link.href} className="flex menu-links text-lg items-center gap-1 transition-all duration-300 hover:text-(--prim)">
                    {link.label} <i className="ri-arrow-down-s-line"></i>
                  </Link>
                  <div className="absolute left-0 top-8 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-(--white) shadow-xl border border-gray-50/10 rounded-lg z-500 min-w-45">
                    {link.dropdown.map((item) => (
                      <Link key={item.label} href={link.href} className="block px-4 py-2 text-md rounded-md transition-all duration-300 hover:text-(--prim)">
                        <i className="bi bi-gear text-xs"></i> {item.label} 
                    </Link>
                    ))}
                  </div>
                </div>
              ) : (
                  <Link key={link.label} href={link.href} className="text-lg transition-all duration-300 hover:text-(--prim)">
                   {link.label} 
                  </Link>
              )
            )}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-1">
            <i className="bi bi-telephone-inbound text-2xl px-3 py-2 rounded-full"></i>
            <div className="flex flex-col">
              <p>Call Us Now</p>
              <h3 className="text-(--prim) GolosText">+234 8023603415</h3>
            </div>
          </button>

          <Link href="/UI-Components/Pages/Contact">
            <button className="lg:hidden bg-(--prim) text-white font-medium px-3 py-1.5 rounded-full hover:bg-white hover:text-(--black) border border-transparent hover:border-gray-400 cursor-pointer transition-all duration-300">
              Get a Quote!
            </button>
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-2xl"
          >
            <i className={`ri-${
              mobileMenuOpen ? "close-line" : "menu-3-line"
            } transition-all duration-300`}></i>
          </button>
        </div>
      </div>
      {/* Mobile Navlink */}
      <div className={`lg:hidden bg-(--white) border-t border-gray-400 overflow-hidden transition-all duration-500 ${mobileMenuOpen ? "max-h-175 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>
        <div className="px-[8%] space-y-3">
          {navLinks.map((link) => (
              <div key={link.label} className="border border-gray-700/50 rounded-lg overflow-hidden">
              {link.dropdown ? (
                <>
                  <button onClick={() => toggleDropdown(link.label)} className="w-full flex items-center justify-between px-4 py-3 text-left text-(--text) font-medium hover:text-(--prim) transition">
                    {link.label}
                    <i className={`ri-arrow-down-s-line transition-transform duration-300 ${openDropdowns[link.label] ? "rotate-180" : ""}`}></i>
                  </button>
                  <div className={`pl-6 pr-4 bg-gray-800/10 border-t border-gray-700/40 transition-all duration-500 ${openDropdowns[link.label] ? "max-h-75 opacity-100 py-2" : "max-h-0 opacity-0 py-0"}`}>
                    {link.dropdown.map((item) => (
                      <Link 
                        key={item.label} 
                        href={item.href} 
                        className="block py-2 font-semibold hover:text-(--prim) transition border-b border-gray-700/60" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-(--text) hover:text-(--prim) transition font-medium"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar