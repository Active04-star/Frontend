import { swalNotifySuccess } from "../swal/swal-notify-success";

export function logout(fire_swal: boolean): void {
  // Elimina la sesión del localStorage
  localStorage.removeItem("userSession");
  localStorage.removeItem("sportCenter");

  // Muestra la notificación si es necesario
  if (fire_swal) {
    swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
  }

  // Usa window.location.origin para mantener al usuario en el frontend
  const frontendUrl = window.location.origin;
  window.location.href = `${frontendUrl}/api/auth/logout`;
}
