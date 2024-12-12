import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Link from "next/link";
import { FaCalendarAlt, FaUserSlash, FaCashRegister } from "react-icons/fa";
import {
  AiOutlineCloud,
  AiOutlineUserSwitch,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { BsBarChart, BsShieldCheck, BsMegaphone } from "react-icons/bs";




const LandingView: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-dark min-h-screen flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col justify-center px-10 text-white">
            <h1 className="text-5xl font-bold text-primary mb-4">Active</h1>
            <p className="text-xl mb-6">
              LA MEJOR FORMA DE <span className="text-primary">RESERVAR</span>{" "}
              TU CANCHA
            </p>
            <div className="space-x-4">
              <button className="bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-600">
                <Link href="/register">REGISTRATE</Link>
              </button>
              <button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-dark">
                RESERVAR
              </button>
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
        <div className="bg-white text-gray-800 pb-[200px]">
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
          <section className="py-16">
            <div className="container mx-auto grid grid-cols-2 gap-8">
              <div>
                <Image
                  src="https://dam.which.co.uk/IC20006-0459-00-front-800x600.jpg"
                  alt="App en un dispositivo móvil"
                  width={500}
                  height={500}
                  className="mx-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Mirá lo fácil que es usar nuestra app
                </h3>
                <ol className="list-decimal space-y-4 pl-6">
                  <li>
                    <strong>Registrate:</strong> Creá tu cuenta para comenzar a
                    utilizar la aplicación.
                  </li>
                  <li>
                    <strong>Reservá un turno:</strong> Seleccioná el horario y
                    cancha de tu preferencia.
                  </li>
                  <li>
                    <strong>¡A jugar!</strong> Confirmá tu asistencia y
                    ¡disfrutá!
                  </li>
                </ol>
              </div>
            </div>
          </section>
          {/* Sección: Ventajas y características */}
          <section id="about" className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">
                ¿Por qué elegirnos?
              </h3>
              <div className="grid grid-cols-3 gap-8">
                {/* Columna 1 */}
                <div>
                  <h4 className="font-bold mb-2 flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" /> Gestión de
                    Agenda
                  </h4>
                  <p>Gestiona tu agenda de manera fácil y segura.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <FaUserSlash className="text-red-500 mr-2" /> Sanción de
                    Jugadores
                  </h4>
                  <p>Sanciona jugadores según las reglas de tu cancha.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <FaCashRegister className="text-green-500 mr-2" /> Gestión
                    de cajas
                  </h4>
                  <p>Controla los ingresos y egresos con transparencia.</p>
                </div>

                {/* Columna 2 */}
                <div>
                  <h4 className="font-bold mb-2 flex items-center">
                    <AiOutlineCloud className="text-blue-500 mr-2" /> Siempre
                    Disponible
                  </h4>
                  <p>Accede desde cualquier dispositivo en cualquier lugar.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <AiOutlineUserSwitch className="text-orange-500 mr-2" />{" "}
                    Múltiples Sesiones
                  </h4>
                  <p>Controla tu negocio sin importar dónde estés.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <AiOutlineCreditCard className="text-purple-500 mr-2" />{" "}
                    Pago Anticipado
                  </h4>
                  <p>Recibe pagos anticipados para asegurar ingresos.</p>
                </div>

                {/* Columna 3 */}
                <div>
                  <h4 className="font-bold mb-2 flex items-center">
                    <BsBarChart className="text-green-500 mr-2" /> Estadísticas
                  </h4>
                  <p>Obtén estadísticas clave para tomar mejores decisiones.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <BsShieldCheck className="text-blue-500 mr-2" />{" "}
                    Verificación de cuentas
                  </h4>
                  <p>Verifica los usuarios para mayor seguridad.</p>
                  <h4 className="font-bold mt-4 mb-2 flex items-center">
                    <BsMegaphone className="text-yellow-500 mr-2" /> Promoción
                    del complejo
                  </h4>
                  <p>Promociona tu negocio y atrae más usuarios.</p>
                </div>
              </div>
            </div>
          </section>
          ;
        </div>
      </div>
    </>
  );
};

export default LandingView;
