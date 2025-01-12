import { swalNotifySuccess } from "../swal/swal-notify-success";

export function logout(fire_swal: boolean): void {
  // Elimina la sesión del localStorage
  localStorage.removeItem("userSession");
  localStorage.removeItem("sportCenter");

  // Muestra la notificación si es necesario
  if (fire_swal) {
    swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
  }

  window.location.href = "/api/auth/logout";
}
