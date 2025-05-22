import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-black">
        <header className="hidden sm:flex w-full bg-[#440986] p-4 items-center">
          <img src="/logo.svg" alt="Fanation" className="h-6" />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
