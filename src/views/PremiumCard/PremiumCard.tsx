"use client";

import { useEffect, useState } from "react";
import { Crown, HelpCircle } from "lucide-react";
import { PremiumButton } from "@/components/premiumButton/premiumButton";
import { PremiumFeature } from "@/components/premiumFeature/premiumFeature";
import { API_URL } from "@/config/config";
import { IUser } from "@/interfaces/user_Interface";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";

const features = [
  "Gestiona ilimitadas canchas y deportes",
  "Visibilidad destacada para tu complejo",
  "Reserva fácil y rápida para tus clientes",
  "Soporte técnico prioritario 24/7",
  "Acceso a estadísticas detalladas y reportes",
];

function PremiumCard() {
  const [user] = useLocalStorage("userSession", null);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

  const createCheckout = async () => {
    if (!user) {
      alert("Por favor inicia sesión para continuar.");
      return;
    }
    setIsLoading(true); // Inicia el estado de carga

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
            userId: user.id,
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
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

        {/* Features */}
        <div className="p-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <PremiumFeature key={index} text={feature} />
            ))}
          </ul>

          {/* Action Button */}
          <div className="mt-8">
            {user?.stripeCustomerId? (
              <p className="text-center text-green-600 font-bold">¡Ya tienes Premium!</p>
            ) : (
              <PremiumButton
                isLoading={isLoading}
                user={user}
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


