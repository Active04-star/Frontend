'use client'
// import { useLocalStorage } from '@/helpers/auth-helpers/useLocalStorage';
// import { IRegisterErrors, IRegisterProps } from '@/interfaces/interfaces.types';
import React, { useEffect, useState } from 'react'
// import Swal from 'sweetalert2';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ErrorHelper } from '@/helpers/errors/error-helper';
// import { swalNotifyError } from '@/helpers/swal/swal-notify-error';
// import { swalNotifyUnknownError } from '@/helpers/swal/swal-notify-unknown-error';

const RegisterView: React.FC = () => {

//     const initalState = {
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         profileImage: "",
//       };

// const [userData, setUserData] = useState<IRegisterProps>(initalState)
// const [errors, setErrors] = useState<IRegisterErrors>(initalState);

// // const [showPassword, setShowPassword] = useState(false);
// // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// const [isSubmitting, setIsSubmitting] = useState(false);
// const [isAllowed, setIsAllowed] = useState(true);
// const [iuser, setUser] = useLocalStorage("userSession", "");



// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     if (iuser.token === null || iuser.token === undefined) {
//       setIsAllowed(true);

//     } else {
//       setIsAllowed(false);

//     }
//     console.log(user);
//   }, [iuser, user]);



//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (isSubmitting) return; // Evitar múltiples clics rápidos
//     setIsSubmitting(true);

//     const currentErrors = validateRegisterForm(userData);
//     setErrors(currentErrors);

//     if (Object.values(currentErrors).some((error) => error)) {
//       Swal.fire({
//         icon: "error",
//         title: "Error en el registro",
//         text: "Por favor corrige los errores antes de continuar.",
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       await register(userData);
//     } catch (error: any) {
//       if (error instanceof ErrorHelper) {
//         swalNotifyError(error);
//       } else {
//         swalNotifyUnknownError(error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const handleLogout = () => {
//     localStorage.clear();
//     setIsAllowed(true);

//     if(user) {
//       window.location.href = "/api/auth/logout";
//     }

//   };


  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
    <h1 className="text-5xl font-bold text-gray-900 mb-8  ">
      Regístrate
    </h1>
    <form className="w-full max-w-sm">
      <div className="mb-6">
        <label
          className="block text-gray-500 mb-2 text-center font-medium text-lg"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
        />
      </div>
  
      <div className="mb-6">
        <label
          className="block text-gray-500 mb-2 text-center font-medium text-lg"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="agu@gmail.com"
          className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
        />
      </div>
  
      <div className="mb-6 relative">
        <label
          className="block text-gray-500 mb-2 text-center font-medium text-lg"
          htmlFor="password"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
        </div>
      </div>
  
      <div>
        <div>
          <label
            className="block text-gray-500 mb-2 text-center font-medium text-lg"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
        </div>
  
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="******"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          
        </div>
      </div>
  
      <button
        type="submit"
        className="bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-600 bg-yellow-400"
      >
        Registrarse
      </button>
    </form>
  </div>
  )
} 

export default RegisterView