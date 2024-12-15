'use client'

import Card from '@/components/card/card';
import { getComplexesDB } from '@/helpers/complexes.helpers';
import React, { useEffect, useState } from 'react';
import { IComplex } from '@/interfaces/card_Interface';

const UserView = () => {
  const [complexes, setComplexes] = useState<IComplex[]>([]); // Definir el tipo de dato aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getComplexes = async () => {
      try {
        const data = await getComplexesDB();
        setComplexes(
          data.map((complex: any) => ({
            id: complex.id,
            address: complex.address || 'Dirección no disponible',
            active: complex.active,
            image: complex.image,
          }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getComplexes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {complexes.map((complex) => (
        <Card key={complex.id} {...complex} />
      ))}
    </div>
  );
};

export default UserView;
