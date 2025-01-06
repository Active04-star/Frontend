"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";
import LoadingCircle from "@/components/general/loading-circle";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { zodValidate } from "@/helpers/validate-zod";
import { UserSchemaWToken } from "@/types/user-schema";
import Image from "next/image";
import { FaCalendarAlt, FaCashRegister, FaUserSlash } from "react-icons/fa";
import {
  AiOutlineCloud,
  AiOutlineCreditCard,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { BsBarChart, BsMegaphone, BsShieldCheck } from "react-icons/bs";

const LandingView: React.FC = () => {
  const [user] = useLocalStorage("userSession", null);
  const [center] = useLocalStorage("sportCenter", null);
  const [show, setShow] = useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (center !== undefined && center !== null) {
      setIsManager(true);
    }

    const validate = zodValidate(user, UserSchemaWToken);
    if (!validate.success) {
      setShow(true);
    }

    setIsLoading(false);
  }, [center, user]);

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
              LA MEJOR FORMA DE <span className="text-primary">REGISTRAR</span>{" "}
              TU CANCHA
            </p>
            <div className="space-x-4">
              {show && (
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

        {/* Sección: Estadísticas */}
        <section className="bg-black text-white py-10">
          <div className="container mx-auto flex justify-around items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold">+500.000</h2>
              <p>turnos concretados</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">+100.000</h2>
              <p>usuarios activos</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">+2.000</h2>
              <p>canchas disponibles</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">24/7</h2>
              <p>disponibilidad</p>
            </div>
          </div>
        </section>

        <section className=" bg-white p-[150px]">
          <div className="container mx-auto grid grid-cols-2 gap-8">
            <div>
              <div className="w-1/2 relative">
                <Image
                  src="https://dam.which.co.uk/IC20006-0459-00-front-800x600.jpg"
                  alt="App en un dispositivo móvil"
                  width={500}
                  height={300} // Ajusta según el diseño
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Mirá lo fácil que es usar nuestra app
              </h3>
              <ol className="list-decimal space-y-4 pl-6 text-black">
                <li>
                  <strong>Registrate:</strong> Creá tu cuenta para comenzar a
                  utilizar la aplicación.
                </li>
                <li>
                  <strong>Reservá un turno:</strong> Seleccioná el horario y
                  cancha de tu preferencia.
                </li>
                <li>
                  <strong>¡A jugar!</strong> Confirmá tu asistencia y ¡disfrutá!
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Sección: Ventajas y características */}
        <section id="about" className="py-16 bg-gray-100 pb-[200px]">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-center text-black mb-12">
              ¿Por qué elegirnos?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center text-black">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  Gestión de Agenda
                </h4>
                <p className="text-gray-700">
                  Gestiona tu agenda de manera fácil y segura.
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 flex items-center text-black">
                  <FaUserSlash className="text-red-500 mr-2" />
                  Sanción de Jugadores
                </h4>
                <p className="text-gray-700">
                  Sanciona jugadores según las reglas de tu cancha.
                </p>
                <h4 className="font-bold mt-4 mb-2 flex items-center  text-black">
                    <FaCashRegister className="text-green-500 mr-2" /> Gestión
                    de cajas
                  </h4>
                  <p  className="text-gray-700">Controla los ingresos y egresos con transparencia.</p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center text-black">
                  <AiOutlineCloud className="text-blue-500 mr-2" />
                  Siempre Disponible
                </h4>
                <p className="text-gray-700">
                  Accede desde cualquier dispositivo en cualquier lugar.
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 flex items-center text-black">
                  <AiOutlineUserSwitch className="text-orange-500 mr-2" />
                  Múltiples Sesiones
                </h4>
                <p className="text-gray-700">
                  Controla tu negocio sin importar dónde estés.
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 flex items-center text-black">
                  <AiOutlineCreditCard className="text-purple-500 mr-2" />
                  Pago Anticipado
                </h4>
                <p className="text-gray-700">
                  Recibe pagos anticipados para asegurar ingresos.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center text-black">
                  <BsBarChart className="text-green-500 mr-2" />
                  Estadísticas
                </h4>
                <p className="text-gray-700">
                  Obtén estadísticas clave para tomar mejores decisiones.
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 flex items-center text-black">
                  <BsShieldCheck className="text-blue-500 mr-2" />
                  Verificación de Cuentas
                </h4>
                <p className="text-gray-700">
                  Verifica los usuarios para mayor seguridad.
                </p>

                <h4 className="text-lg font-bold mt-6 mb-3 flex items-center text-black">
                  <BsMegaphone className="text-yellow-500 mr-2" />
                  Promoción del Complejo
                </h4>
                <p className="text-gray-700">
                  Promociona tu negocio y atrae más usuarios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingView;
