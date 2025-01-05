"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";
import LoadingCircle from "@/components/general/loading-circle";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { zodValidate } from "@/helpers/validate-zod";
import { UserSchemaWToken } from "@/types/user-schema";
import Image from "next/image";

const LandingView: React.FC = () => {
  const [user] = useLocalStorage("userSession", null);
  const [center] = useLocalStorage("sportCenter", null);
  const [show, setShow] = useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    console.log('center',center);
    
    // Lógica que depende de datos locales
    if (center !== undefined && center !== null) {
      console.log("hollaa", center);
      setIsManager(true);
    }

    const validate = zodValidate(user, UserSchemaWToken);

    if (!validate.success) {
      setShow(true);
    }

    // Cambiar estado de carga
    setIsLoading(false);
  }, []); // Se ejecuta una vez al montar el componente

  console.log('ismanager',isManager);
  

  // Mostrar un loader mientras se inicializa
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-dark min-h-screen flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col justify-center px-10 text-white">
            <h1 className="text-5xl font-bold text-primary mb-4">Active</h1>
            <p className="text-xl mb-6">
              LA MEJOR FORMA DE <span className="text-primary">REGISTRA</span> TU CANCHA
            </p>
            <div className="space-x-4">
              {!show ? null : (
                <button className="bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-600">
                  <Link href="/register">REGISTRATE</Link>
                </button>
              )}
              {isManager ? (
                <Link href="/manager">
                  <button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-dark">
                    PANEL DE CONTROL
                  </button>
                </Link>
              ) : (
                <Link href="/registerSportcenter">
                  <button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-dark">
                    INSCRIBE TU CENTRO DEPORTIVO
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="w-1/2 relative">
          <Image
              src="https://images.pexels.com/photos/2277980/pexels-photo-2277980.jpeg?cs=srgb&dl=pexels-king-siberia-1123639-2277980.jpg&fm=jpg"
              alt="Cancha de basketball"
              width={1000}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingView;
