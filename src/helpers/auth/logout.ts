import { swalNotifySuccess } from "../swal/swal-notify-success";

export function logout(fire_swal: boolean): void {
  // Elimina la sesión del localStorage
  localStorage.removeItem("userSession");
  localStorage.removeItem("sportCenter");

  // Muestra la notificación si es necesario
  if (fire_swal) {
    swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
  }

  // Construye la URL de logout basada en la variable de entorno
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  window.location.href = `${baseUrl}/api/auth/logout`;
}
