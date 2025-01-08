"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversation, setConversation] = useState<{ sender: string; text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState(""); // Input del usuario
  const [error, setError] = useState(""); // Mensaje de error si no se ingresa texto

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleOptionSelect = (option: string) => {
    let response = "";
    let nextStep = currentStep;

    switch (option) {
      case "1":
        response = "¿En qué fecha y hora te gustaría hacer la reserva?";
        nextStep = 1;
        break;
      case "2":
        response = "Nuestros precios dependen de la cancha y la duración. ¿Qué tipo de cancha te interesa? Fútbol, tenis o pádel.";
        nextStep = 2;
        break;
      case "3":
        response = "Para hacer una reserva, elige el tipo de cancha, la fecha y la hora.";
        nextStep = 3;
        break;
      case "4":
        response = "Para cambiar una reserva, por favor indícanos el número de reserva.";
        nextStep = 4;
        break;
      case "5":
        response = "¿Prefieres ser contactado por correo electrónico o WhatsApp?";
        nextStep = 5;
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

  const handleUserInput = () => {
    if (!userInput.trim()) {
      setError("Por favor, escribe algo");
      return;
    }

    let response = "";

    if (currentStep === 1) {
      response = `¡Reserva confirmada para el ${userInput}! ¿A qué hora te gustaría?`;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      response = `¡Genial! Has elegido la cancha para ${userInput}. ¿Qué fecha y hora prefieres?`;
      setCurrentStep(1);
    } else {
      response = "Gracias por tu mensaje. ¿En qué más puedo ayudarte?";
      setCurrentStep(0);
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: "user", text: userInput },
      { sender: "bot", text: response },
    ]);
    setError("");
    setUserInput("");
  };

  const handleContact = (platform: string) => {
    if (platform === "email") {
      window.location.href = "mailto:support@canchas.com";
    } else if (platform === "whatsapp") {
      window.location.href = "https://wa.me/+1234567890";
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserInput();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChat}
        className="bg-yellow-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
      >
        <FontAwesomeIcon icon={faComment} size="2x" />
        <span className="ml-2">¿En qué puedo ayudarte?</span>
      </button>

      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white p-4 shadow-lg rounded-lg border border-gray-300 max-h-96 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {conversation.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <p
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-100 text-black" : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            <div ref={chatEndRef} />

            {error && <p className="text-red-500 text-center">{error}</p>}

            {currentStep === 0 && (
              <div className="mt-4 space-y-2">
                <button onClick={() => handleOptionSelect("1")} className="w-full p-3 bg-blue-100 text-black rounded-lg">
                  1. Ver disponibilidad de canchas
                </button>
                <button onClick={() => handleOptionSelect("2")} className="w-full p-3 bg-blue-100 text-black rounded-lg">
                  2. Ver precios de alquiler
                </button>
                <button onClick={() => handleOptionSelect("3")} className="w-full p-3 bg-blue-100 text-black rounded-lg">
                  3. Reservar una cancha
                </button>
                <button onClick={() => handleOptionSelect("4")} className="w-full p-3 bg-blue-100 text-black rounded-lg">
                  4. Cambiar una reserva
                </button>
                <button onClick={() => handleOptionSelect("5")} className="w-full p-3 bg-blue-100 text-black rounded-lg">
                  5. Hablar con un agente
                </button>
              </div>
            )}

            {(currentStep === 1 || currentStep === 2) && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe aquí..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-black" // Cambia el color aquí
                />
                <button onClick={handleUserInput} className="w-full mt-2 bg-blue-500 text-white p-3 rounded-lg">
                  Enviar
                </button>
              </div>
            )}

            {currentStep === 5 && (
              <div className="mt-4 space-y-2">
                <button onClick={() => handleContact("email")} className="w-full p-3 bg-yellow-100 text-black rounded-lg">
                  Contáctanos por Email
                </button>
                <button onClick={() => handleContact("whatsapp")} className="w-full p-3 bg-green-100 text-black rounded-lg">
                  Contáctanos por WhatsApp
                </button>
              </div>
            )}

            <div className="mt-4">
              <button onClick={() => setCurrentStep(0)} className="w-full bg-red-100 text-black p-3 rounded-lg">
                Volver al menú principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
