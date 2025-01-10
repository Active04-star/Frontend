import { swalNotifySuccess } from "../swal/swal-notify-success";

export function logout(fire_swal: boolean): void {
    localStorage.removeItem("userSession");
    localStorage.removeItem("sportCenter");

    if(fire_swal) {
        swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
    }

    window.location.href = "/api/auth/logout";
}