'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/helpers/auth/useLocalStorage'
import { IUser } from '@/types/zTypes'
import { API_URL } from '@/config/config'
import { fetchAndCatch } from '@/helpers/errors/fetch-error-interceptor'
import { useRouter } from 'next/navigation'
import { Page } from '@/enum/Pages'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

interface SportCenter {
  name: string
  address: string
  averageRating: number
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useLocalStorage<Message[]>("chatHistory", [
    { id: Date.now(), text: "Hola! ¿En qué puedo ayudarte?", sender: 'bot' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useLocalStorage<IUser | null>("userSession", null)
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (redirectCountdown !== null && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
    } else if (redirectCountdown === 0) {
      router.push(Page.SEARCH)
      setRedirectCountdown(null)
    }
    return () => clearTimeout(timer)
  }, [redirectCountdown, router])

  const handleOptionClick = async (option: string) => {
    const newUserMessage = { id: Date.now() + Math.random(), text: option, sender: 'user' as const }
    setMessages((prev :Message[])=> [...prev, newUserMessage])
    setIsLoading(true)

    if (option === "Mejores centros deportivos") {
      await getBestSportCenters()
    } else if (option === "¿Cómo puedo registrar mi centro?") {
      await getRegisterCenterInfo()
    } else if (option === "Cómo reservar") {
      await getReservationInfo()
    }

    setIsLoading(false)
  }

  const getBestSportCenters = async () => {
    try {
      const data = await fetchAndCatch(`${API_URL}/sportcenter/search?page=1&limit=3&rating=4`, { method: "GET" })

      if (data.sport_centers && data.sport_centers.length > 0) {
        const topCenters = data.sport_centers.slice(0, 3).map((center: SportCenter) => 
          `${center.name} - Calificación: ${center.averageRating.toFixed(1)}`
        ).join('\n')
        
        const newBotMessage = { id: Date.now(), text: `Los mejores centros deportivos(rating >=4) son:\n${topCenters}`, sender: 'bot' as const }
        setMessages((prev: Message[]) => [...prev, newBotMessage])
      } else {
        const newBotMessage = { id: Date.now(), text: "Lo siento, no se encontraron centros deportivos.", sender: 'bot' as const }
        setMessages((prev: Message[]) => [...prev, newBotMessage])
      }
    } catch (error) {
      const newBotMessage = { id: Date.now(), text: "Hubo un error al obtener los centros deportivos. Por favor, intenta más tarde.", sender: 'bot' as const }
      setMessages((prev: Message[]) => [...prev, newBotMessage])
    }
  }

  const getRegisterCenterInfo = async () => {
    const newBotMessage = { 
      id: Date.now() + Math.random(), 
      text: user 
        ? "Para registrar tu centro deportivo, sigue estos pasos:\n1. Haz clic en tu imagen de perfil en la esquina superior derecha.\n2. Selecciona 'Registrar mi centro' en el menú desplegable.\n3. Completa el formulario con los datos de tu centro deportivo.\n4. Una vez validados los datos, se te otorgará acceso al panel exclusivo para managers.\n\nSi tienes alguna duda durante el proceso, no dudes en contactar con nuestro equipo de soporte."
        : "Para registrar tu centro deportivo, primero debes iniciar sesión o registrarte en nuestra plataforma. Sigue estos pasos:\n1. Haz clic en 'Iniciar sesión' o 'Registrarse' en la esquina superior derecha de la página.\n2. Una vez que hayas iniciado sesión, haz clic en tu imagen de perfil.\n3. Selecciona 'Registrar mi centro' en el menú desplegable.\n4. Completa el formulario con los datos de tu centro deportivo.\n5. Después de que tus datos sean validados, tendrás acceso al panel exclusivo para managers.\n\nSi necesitas ayuda durante el proceso, nuestro equipo de soporte estará encantado de asistirte.",
      sender: 'bot' as const
    }
    setMessages((prev: Message[]) => [...prev, newBotMessage])
  }

  const getReservationInfo = async () => {
    const newBotMessage = { 
      id: Date.now() + Math.random(), 
      text: "Para realizar una reserva, te redirigiremos a la página de usuarios donde encontrarás una lista de centros deportivos. Cada centro tiene canchas disponibles para reservar. Te llevaremos allí en 10 segundos. Si deseas cancelar la redirección, haz clic en el botón 'Cancelar' que aparecerá a continuación.", 
      sender: 'bot' as const
    }
    setMessages((prev: Message[]) => [...prev, newBotMessage])
    setRedirectCountdown(10)
  }

  const cancelRedirect = () => {
    setRedirectCountdown(null)
    const newBotMessage = { 
      id: Date.now() + Math.random(), 
      text: "Has cancelado la redirección. ¿En qué más puedo ayudarte?", 
      sender: 'bot' as const
    }
    setMessages((prev: Message[]) => [...prev, newBotMessage])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-lg w-80 mb-4"
          >
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold">Chatbot</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg p-2 max-w-[70%] ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <Loader className="animate-spin" />
                </div>
              )}
              {redirectCountdown !== null && redirectCountdown > 0 && (
                <div className="flex flex-col items-center">
                  <p>Redirigiendo en {redirectCountdown} segundos...</p>
                  <button 
                    onClick={cancelRedirect}
                    className="mt-2 bg-red-500 text-white rounded-lg py-1 px-3 hover:bg-red-600 transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 border-t space-y-2">
              <button
                onClick={() => handleOptionClick("Mejores centros deportivos")}
                className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200"
              >
                Mejores centros deportivos
              </button>
              <button
                onClick={() => handleOptionClick("¿Cómo puedo registrar mi centro?")}
                className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200"
              >
                ¿Cómo puedo registrar mi centro?
              </button>
              <button
                onClick={() => handleOptionClick("Cómo reservar")}
                className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200"
              >
                Cómo reservar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-200"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

export default Chatbot

