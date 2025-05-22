'use client';

import { useRouter } from 'next/navigation';
import RecorteForm from '@/components/RecorteForm';
import { FormDataRecorte } from '@/services/recortes';

export default function NovaPecaPage() {
  const router = useRouter();

  const handleSubmit = async (data: FormDataRecorte) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recortes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar recorte:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nova Peça</h1>
      <RecorteForm onSubmit={handleSubmit} />
    </div>
  );
}