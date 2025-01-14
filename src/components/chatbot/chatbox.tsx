"use client";

import React, { useState, useEffect, useRef } from "react";
import { AiOutlineWechat } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const ChatButton = () => {
  // Estados principales
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversation, setConversation] = useState<{ sender: string; text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [showText, setShowText] = useState(false);

  const availableSports = ["Fútbol", "Tenis", "Pádel"];

  // Efecto para cerrar el chat si se hace clic fuera del área del chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Efecto para hacer scroll hacia el final cuando se actualiza la conversación
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Lógica para manejar la selección de opciones
  const handleOptionSelect = (option: string) => {
    let response = "";
    let nextStep = currentStep;

    switch (option) {
      case "1":
        response = "Tenemos canchas de Fútbol, Tenis y Pádel. ¿Cuál te interesa? Si eliges Fútbol, la cancha está cubierta y tiene césped sintético. En Tenis, contamos con superficies de arcilla. En Pádel, las canchas son de vidrio. ¿Te gustaría más detalles sobre alguna?";
        nextStep = 1;
        break;
      case "2":
        response = "Puedes registrarte en nuestra página web aquí: [Registrarse](https://www.tusitioweb.com/registro). Solo necesitarás tu correo, nombre y teléfono. ¿Te gustaría proceder con el registro?";
        nextStep = 2;
        break;
      case "3":
        response = "Para hacer una reserva, por favor proporciona lo siguiente:\n1. El tipo de cancha (Fútbol, Tenis o Pádel)\n2. La fecha y hora de la reserva.\n3. Duración de la reserva.";
        nextStep = 3;
        break;
      case "4":
        response = "Las opciones de membresía son:\n1. Membresía mensual - Acceso ilimitado durante un mes.\n2. Membresía anual - Acceso ilimitado durante todo el año. ¿Te gustaría más información sobre alguna?";
        nextStep = 4;
        break;
      case "5":
        response = "Por favor, proporciona tu nombre de usuario. Luego, describe el problema que estás experimentando para que podamos ayudarte mejor.";
        nextStep = 5;
        break;
      case "6":
        response = "Puedes contactarnos por email o WhatsApp. ¿Te gustaría hablar por alguno de estos canales?";
        nextStep = 6;
        break;
      default:
        response = "Lo siento, no entendí esa opción. ¿En qué más puedo ayudarte?";
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: "user", text: option },
      { sender: "bot", text: response },
    ]);
    setCurrentStep(nextStep);
  };

  // Manejo de la entrada del usuario
  const handleUserInput = () => {
    if (!userInput.trim()) {
      setError("Por favor, escribe algo");
      return;
    }

    let response = "";
    const sportSelected = userInput.trim();

    if (availableSports.includes(sportSelected)) {
      if (currentStep === 1) {
        response = `¡Genial! Has elegido la cancha de ${sportSelected}. A continuación, te mostramos nuestras opciones de canchas disponibles para este deporte:\n\n`;

        if (sportSelected === "Fútbol") {
          response += "1. Cancha 1: Césped sintético, medidas: 30x50m, ideal para partidos recreativos.\n2. Cancha 2: Césped sintético, medidas: 40x70m, ideal para partidos más grandes.\n";
        } else if (sportSelected === "Tenis") {
          response += "1. Cancha 1: Superficie de arcilla, medidas: 23.77x8.23m, ideal para jugadores avanzados.\n2. Cancha 2: Superficie dura, medidas: 23.77x8.23m, ideal para entrenamientos.\n";
        } else if (sportSelected === "Pádel") {
          response += "1. Cancha 1: Superficie de vidrio, medidas: 10x20m, ideal para partidos recreativos.\n2. Cancha 2: Superficie de vidrio, medidas: 10x20m, ideal para torneos.\n";
        }

        response += "\nTe invitamos a registrarte y proceder con la reserva aquí: [Registrarse](https://www.tusitioweb.com/registro).";
        setCurrentStep(2); // Pasar al paso de registro
      } else if (currentStep === 2) {
        response = "Perfecto, ahora que estás registrado, puedes proceder a realizar la reserva directamente en nuestro sistema.";
        setCurrentStep(3); // Pasamos al siguiente paso para la reserva
      }
    } else {
      response = `Lo siento, no tenemos canchas de ${sportSelected}. Las opciones disponibles son: Fútbol, Tenis y Pádel. ¿Te gustaría elegir uno de estos deportes?`;
      setCurrentStep(0); // Volver al paso inicial
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: "user", text: userInput },
      { sender: "bot", text: response },
    ]);
    setError("");
    setUserInput("");
  };

  // Manejo de la acción para contactar por email o WhatsApp
  const handleContact = (platform: string) => {
    if (platform === "email") {
      window.location.href = "mailto:support@canchas.com"; // Reemplaza por tu correo electrónico real
      setIsChatOpen(false); // Cerrar el chat cuando se hace clic en el correo
    } else if (platform === "whatsapp") {
      window.location.href = "https://wa.me/+1234567890"; // Reemplaza con tu número de WhatsApp real
      setIsChatOpen(false); // Cerrar el chat cuando se hace clic en WhatsApp
    }
  };

  // Manejo de la tecla Enter en el campo de texto
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserInput();
    }
  };

  // Control de visibilidad del texto en el botón de chat
  const toggleText = (flag: boolean) => {
    setShowText(flag);
  };

  // Función para minimizar el chat y resetear la conversación
  const minimizeChat = () => {
    setIsChatOpen(false);
    setConversation([]);  // Resetear la conversación
    setCurrentStep(0);     // Reiniciar el paso
    setUserInput("");      // Limpiar la entrada del usuario
  };

  return (
    <div ref={divRef} className="fixed bottom-4 right-4">
      {/* Botón de abrir chat */}
      <button
        onMouseEnter={() => toggleText(true)}
        onMouseLeave={() => toggleText(false)}
        onClick={() => setIsChatOpen(true)}
        className="flex items-center bg-yellow-500 text-white p-2 rounded-full transition-transform shadow-lg focus:outline-none"
      >
        <AiOutlineWechat className="w-8 h-8" />
        <span className={`ml-2 transition-all duration-300 ${showText ? "max-w-xs opacity-100" : "max-w-0 opacity-0"} overflow-hidden whitespace-nowrap`}>
          ¿En qué puedo ayudarte?
        </span>
      </button>

      {/* Chat abierto */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white p-4 shadow-lg rounded-lg border border-gray-300 max-h-96 overflow-y-auto">
          {/* Botón para cerrar el chat */}
          <button
            onClick={minimizeChat}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            <IoClose className="w-6 h-6" />
          </button>

          <div className="flex flex-col space-y-4">
            {/* Saludo inicial */}
            {currentStep === 0 && (
              <div className="text-center">
                <p className="text-lg font-semibold text-black">
                  ¡Hola! Soy Valentina, tu asistente virtual. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
            )}

            {/* Mostrar conversación */}
            {conversation.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <p
                  className={`inline-block p-3 rounded-lg text-sm ${msg.sender === "user" ? "bg-yellow-100 text-black" : "bg-gray-100 text-black"}`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            <div ref={chatEndRef} />
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Opciones dependiendo del paso actual */}
            {currentStep === 0 && (
              <div className="mt-4 space-y-2">
                <button onClick={() => handleOptionSelect("1")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  1. ¿Qué tipo de canchas hay?
                </button>
                <button onClick={() => handleOptionSelect("2")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  2. ¿Cómo me puedo registrar?
                </button>
                <button onClick={() => handleOptionSelect("3")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  3. ¿Cómo puedo reservar?
                </button>
                <button onClick={() => handleOptionSelect("4")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  4. ¿Qué tipos de membresías se manejan?
                </button>
                <button onClick={() => handleOptionSelect("5")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  5. ¿Presentas algún problema para ingresar?
                </button>
                <button onClick={() => handleOptionSelect("6")} className="w-full p-3 bg-gray-100 text-black rounded-lg text-sm">
                  6. Información de contacto o servicio al cliente
                </button>
              </div>
            )}

            {/* Volver al menú principal */}
            <div className="mt-4">
              <button onClick={() => setCurrentStep(0)} className="w-full bg-red-100 text-black p-2 rounded-lg text-sm">
                Volver al menú principal
              </button>
            </div>

            {/* Flujos específicos para cada paso */}
            {(currentStep === 1 || currentStep === 2) && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe aquí..."
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm text-black"
                />
                <button onClick={handleUserInput} className="w-full mt-2 bg-yellow-500 text-white p-2 rounded-lg text-sm">
                  Enviar
                </button>
              </div>
            )}

            {currentStep === 5 && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm text-black"
                />
                <textarea
                  placeholder="Escribe tu problema aquí..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm text-black"
                />
                <button
                  onClick={() => {
                    const problemMessage = `Mi nombre es ${username} y mi problema es: ${problemDescription}`;
                    window.location.href = `https://wa.me/+1234567890?text=${encodeURIComponent(problemMessage)}`;
                    setIsChatOpen(false); // Cerrar el chat al contactar por WhatsApp
                  }}
                  className="w-full mt-2 bg-yellow-500 text-white p-2 rounded-lg text-sm"
                >
                  Enviar mensaje
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
