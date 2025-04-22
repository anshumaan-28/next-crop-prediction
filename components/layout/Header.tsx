"use client";

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sprout, Leaf } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaSeedling } from 'react-icons/fa';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Learn', href: '/learn' },

    { name: 'Bot', href: '/bot' },
    { name: 'Results', href: '/results' },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-green-200 dark:border-green-900/30 shadow-sm" 
          : "bg-background border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-50 dark:bg-green-900/30 p-1.5 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
              <FaSeedling className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-display text-lg font-bold bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">CropPredict</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 group",
                pathname === item.href
                  ? "text-green-700 dark:text-green-400 font-semibold"
                  : "text-muted-foreground hover:text-green-700 dark:hover:text-green-400"
              )}
            >
              {item.name}
              {pathname === item.href && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 dark:bg-green-400 rounded-full mx-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href="/profile" className="hidden sm:flex items-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white border-none shadow h-9 rounded-full px-4 text-sm flex items-center gap-1.5 transition-colors duration-200">
              <span>My Profile</span>
            </Button>
          </Link>
          <Link href="/profile" className="sm:hidden">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full bg-green-50 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400">
              <FaUserCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 