import Swal from "sweetalert2";

/** Muestra una notificacion con confirmacion cutomizada.
 * Se debe encadenar a un .then() para poder capturar la confirmacion.
 */
export function swalConfirmation(title: string, text?: string) {
    return Swal.fire({
        icon: "success",
        title: title,
        text: text === "" ? undefined : text,
        showConfirmButton: true,
        cancelButtonText: "Volver",
        showCancelButton: true,
    });
}