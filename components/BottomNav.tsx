"use client";

import { Home, Ticket, MapPin, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-blue-900/30 backdrop-blur-lg border border-white/20 rounded-2xl py-3 px-6 z-50 shadow-2xl">
      <ul className="flex justify-between items-center text-white">
        <li>
          <Link 
            href="/" 
            onClick={() => window.dispatchEvent(new Event('go-home'))}
            className="flex flex-col items-center gap-1 group"
          >
            <Home className="w-6 h-6 group-hover:text-cyan-300 transition-colors" />
            <span className="text-[10px] font-medium group-hover:text-cyan-300">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/cinemas" className="flex flex-col items-center gap-1 group">
            <MapPin className="w-6 h-6 group-hover:text-cyan-300 transition-colors" />
            <span className="text-[10px] font-medium group-hover:text-cyan-300">Cinemas</span>
          </Link>
        </li>
        <li>
          <Link href="/tickets" className="flex flex-col items-center gap-1 group">
            <Ticket className="w-6 h-6 group-hover:text-cyan-300 transition-colors" />
            <span className="text-[10px] font-medium group-hover:text-cyan-300">Tickets</span>
          </Link>
        </li>
        <li>
          <Link href="/profile" className="flex flex-col items-center gap-1 group">
            <User className="w-6 h-6 group-hover:text-cyan-300 transition-colors" />
            <span className="text-[10px] font-medium group-hover:text-cyan-300">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}