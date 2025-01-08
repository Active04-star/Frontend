"use client";

import { useEffect, useState, useCallback } from "react";
import { Crown } from "lucide-react";
import { PremiumButton } from "@/components/premiumButton/premiumButton";
import { PremiumFeature } from "@/components/premiumFeature/premiumFeature";
import { API_URL } from "@/config/config";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";

const features = [
  "Gestiona ilimitadas canchas y deportes",
  "Visibilidad destacada para tu complejo",
  "Reserva fácil y rápida para tus clientes",
  "Soporte técnico prioritario 24/7",
  "Acceso a estadísticas detalladas y reportes",
];

function PremiumCard() {
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  // const { token, user } = userLocalStorage || { token: null, user: null };
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);


  const fetchUserData = useCallback(async () => {
    if (user === null) {
      setIsPageLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/user/solo-para-testing/${user.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data: IUser = await response.json();
      setUserData(data);
      console.log('data',data);
      
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }finally {
    setIsPageLoading(false); // Set loading to false when done
  }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const createCheckout = async () => {
    if (!user) {
      alert("Por favor inicia sesión para continuar.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: "price_1QXReu04KY20KAgUd0axPjmu",
            userId: user.user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la sesión de pago");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió la URL de Stripe");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error ? error.message : "Ocurrió un error inesperado"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 pt-20">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-6 pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 p-10 text-white">
          <div className="absolute top-0 right-0 p-4">
            <Crown className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider mb-1">
            Premium
          </h2>
          <div className="flex items-baseline">
            <span className="text-5xl font-extrabold">$12</span>
            <span className="ml-2 text-yellow-100">USD/anual</span>
          </div>
        </div>

        <div className="p-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <PremiumFeature key={index} text={feature} />
            ))}
          </ul>

          <div className="mt-8">
            {userData?.user.stripeCustomerId ? (
              <p className="text-center text-green-600 font-bold">
                ¡Ya tienes Premium!
              </p>
            ) : (
              <PremiumButton
                isLoading={isLoading}
                user={userData}
                onSubscribe={createCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;