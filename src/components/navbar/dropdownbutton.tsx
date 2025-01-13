"use client";
import { UserRole } from "@/enum/userRole";
import { logout } from "@/helpers/auth/logout";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { getSubPath } from "@/utils/getSubPath";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineKey,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";

const DropDownButton: React.FC = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [actualPage, setActualPage] = useState("loading");
  const [user] = useLocalStorage<IUser | null>("userSession", "");
  const divRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const offStyle =
    "flex items-center block px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors duration-200 pointer-events-none";
  const onStyle =
    "flex items-center block px-4 py-2 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400";

  useEffect(() => {
    setActualPage(getSubPath(window.location.href));

    const mouseOut = (event: MouseEvent) => {
      if (
        divRef.current &&
        event.target instanceof Node &&
        !divRef.current.contains(event.relatedTarget as Node)
      ) {
        timeoutRef.current = setTimeout(() => {
          setIsDropdownOpen(false);
        }, 2000);
      }
    };

    const clickOut = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const mouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const element = divRef.current;
    if (element) {
      element.addEventListener("mouseout", mouseOut);
      element.addEventListener("mouseover", mouseEnter);
    }
    document.addEventListener("mousedown", clickOut);

    return () => {
      if (element) {
        element.removeEventListener("mouseout", mouseOut);
        element.removeEventListener("mouseover", mouseEnter);
      }
      document.removeEventListener("mousedown", clickOut);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && user !== null) {
      setUserData(user);
    }
  }, [user]);

  const handleLogout = async () => {
    logout(true);
  };

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={divRef} className="relative">
      {userData ? (
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center focus:outline-none"
          >
            <Image
              src={userData?.user.profile_image || "/default-profile.png"} // ✅ Imagen optimizada
              alt="Foto de perfil"
              width={32} // Ajusta el ancho
              height={32} // Ajusta la altura
              className="rounded-full border-2 border-yellow-600"
            />
          </button>
        </div>
      ) : actualPage === "loading" ||
        actualPage === "/login" ||
        actualPage === "/register" ? null : (
        <Link href="/login">
          <button
            type="button"
            className="text-white font-bold bg-yellow-600 focus:outline-none rounded-lg text-sm px-4 py-2 text-center"
          >
            Iniciar Sesión
          </button>
        </Link>
      )}

      {isDropdownOpen ? (
        <div className="absolute right-0 max-w-fit max-h-fit">
          <div className="mt-2 w-48 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
            <ul className="py-2">
              {userData?.user.role === UserRole.MAIN_MANAGER && (
                <>
                <li>
                  <Link
                    href="/manager"
                    className={
                      actualPage === "/manager" || actualPage === ""
                        ? offStyle
                        : onStyle
                    }
                  >
                    <AiOutlineKey className="mr-2" /> Panel de Manager
                  </Link>
                </li>
                  <li>
                  <Link
                    href="/settings"
                    className={
                      actualPage === "/settings" || actualPage === ""
                        ? offStyle
                        : onStyle
                    }
                  >
                    <AiOutlineSetting className="mr-2" /> Configuración
                  </Link>
                </li>
                </>
              )}
              {userData?.user.role === UserRole.ADMIN && (
                <li>
                  <Link
                    href="/admin"
                    className={
                      actualPage === "/admin" || actualPage === ""
                        ? offStyle
                        : onStyle
                    }
                  >
                    <AiOutlineKey className="mr-2" /> Panel de Admin
                  </Link>
                </li>
              )}
              {userData?.user.role === UserRole.USER && (
                <>
                  <li>
                    <Link
                      href="/user"
                      className={
                        actualPage === "/user" || actualPage === ""
                          ? offStyle
                          : onStyle
                      }
                    >
                      <AiOutlineCalendar className="mr-2" /> Reservar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className={
                        actualPage === "/settings" || actualPage === ""
                          ? offStyle
                          : onStyle
                      }
                    >
                      <AiOutlineSetting className="mr-2" /> Configuración
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={handleLogout} className={onStyle}>
                  <AiOutlineLogout className="mr-2" /> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownButton;
