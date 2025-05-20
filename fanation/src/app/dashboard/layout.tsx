import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Corpo principal com sidebar + conteúdo */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-100 p-4">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="py-2 px-4 rounded hover:bg-gray-200">Peças</Link>
            <Link href="/dashboard/visualizacao" className="py-2 px-4 rounded hover:bg-gray-200">Visualização</Link>
            <Link href="/dashboard/clientes" className="py-2 px-4 rounded hover:bg-gray-200">Clientes</Link>
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