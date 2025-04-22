"use client";

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'About',
      links: [
        { label: 'Our Mission', href: '/about' },
        { label: 'Team', href: '/about#team' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use', href: '/terms' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Crop Guides', href: '/learn' },
        { label: 'Weather Patterns', href: '/learn/weather' },
        { label: 'Farming Techniques', href: '/learn/techniques' },
        { label: 'FAQ', href: '/about#faq' },
      ]
    },
    {
      title: 'Bot',
      links: [
        { label: 'Farm Bot', href: '/bot' },
        { label: 'Results', href: '/results' },
      ]
    },
  ];
  
  return (
    <footer className="bg-muted/30 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">CropPredict</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Helping farmers make data-driven decisions about which crops to plant for optimal yield and profit.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <FaGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <FaYoutube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Site links */}
          {footerLinks.map(section => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CropPredict by Anshumaan Sharma. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Built with 💚 for farmers around the world
          </p>
        </div>
      </div>
    </footer>
  );
} 