"use client";

import React, { useState } from "react";
import styles from "./LoginandRegister.module.css";
import Google from "@/components/icons/Google.icon";
import Link from "next/link";

export const LoginandRegister = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div id={styles.loginandregister}>
      <div
        className={`${styles.container} ${isActive ? styles.active : ""}`}
        id="container"
      >
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Inicia Sesion</button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form>
            <h1>Iniciar Sesión</h1>
            <nav className="flex flex-wrap gap-4 my-3 ">
              <Link
                type="submit"
                href="api/auth/login/"
                target="_blank"
                rel="noopener noreferrer"
                role="link"
                className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white focus-visible:ring-yellow-500/80 text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 active:bg-black"
                title="Inicia Sesión con Google"
              >
                <Google /> 
              </Link>
            </nav>
            <span>o usa tu email y contraseña</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            {/* <a href="#">Forget Your Password?</a> */}
            <button type="button">Ingresar</button>
          </form>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              {/* Conectamos el botón al handler */}
              <button
                className={styles.hidden}
                id="login"
                type="button"
                onClick={handleLoginClick}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              {/* Conectamos el botón al handler */}
              <button
                className={styles.hidden}
                id="register"
                type="button"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
