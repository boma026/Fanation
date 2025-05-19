import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Fanation',
  description: 'Login - Fanation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-black">
        <header className="w-full bg-[#440986] p-4 flex items-center">
          <img src="/logo.svg" alt="Fanation" className="h-6" />
        </header>
        <main>{children}</main>
      </body>
    </html>
    );
}
