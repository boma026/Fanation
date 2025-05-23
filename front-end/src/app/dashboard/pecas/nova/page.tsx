'use client';

import { useRouter } from 'next/navigation';
import RecorteForm from '@/components/RecorteForm';
import { FormDataRecorte, createRecorte } from '@/services/recortes';

export default function NovaPecaPage() {
  const router = useRouter();

  const handleSubmit = async (data: FormDataRecorte) => {
    const token = localStorage.getItem('token');
    try {
      await createRecorte(data, token ?? undefined);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar recorte:', error);
      alert('Erro ao criar peça. Veja o console para detalhes.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nova Peça</h1>
      <RecorteForm onSubmit={handleSubmit} />
    </div>
  );
}
