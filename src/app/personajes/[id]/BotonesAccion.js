'use client';

import { useRouter } from "next/navigation";

export default function BotonesAccion({ id }) {
  const router = useRouter();

  async function manejarBorrar() {
    const confirmar = confirm('¿Seguro que quieres borrar el personaje?');
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/personajes/${id}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo borrar el personaje');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => router.push(`/personajes/${id}/editar`)}
        className="bg-gold text-white px-6 py-2 rounded-lg font-semibold"
      >
        Editar
      </button>
      <button
        onClick={manejarBorrar}
        className="border border-secondary text-secondary px-6 py-2 rounded-lg font-semibold bg-transparent"
      >
        Borrar
      </button>
    </div>
  );
}