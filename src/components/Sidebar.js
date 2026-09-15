'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const personajesActivo = pathname?.startsWith('/personajes') ?? false;

  return (
    <aside className="w-60 h-screen bg-[#081428] shrink-0 sticky top-0 flex flex-col">
      <Image
        src="/logo.png"
        alt="Logo One Piece"
        width={56}
        height={56}
        className="rounded-full object-cover mx-auto mt-6"
      />
      <nav className="mt-6 flex flex-col gap-1 px-4">
        <Link
          href="/"
          className={`text-white text-base px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
            personajesActivo ? 'bg-gold/15' : 'bg-transparent'
          }`}
        >
          🏴‍☠️ Personajes
        </Link>
        <Link
          href="/deportes"
          className="text-white text-base px-4 py-3 rounded-lg flex items-center gap-2 bg-transparent"
        >
          ⚙️ Deportes
        </Link>
      </nav>
    </aside>
  );
}