import { ReactNode } from 'react';
import Link from 'next/link';

export default function MontagemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Corpo principal com sidebar + conteúdo */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-[#F2F2F7] p-4">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="py-2 px-4 rounded hover:bg-[#440986] hover:text-white">Peças</Link>
            <Link href="/montagem" className="py-2 px-4 rounded hover:bg-[#440986] hover:text-white">Visualização</Link>
            <Link href="/dashboard/clientes" className="py-2 px-4 rounded hover:bg-[#440986] hover:text-white">Clientes</Link>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
