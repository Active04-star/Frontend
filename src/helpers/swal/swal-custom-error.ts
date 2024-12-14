import Swal from "sweetalert2";

/** Muestra un Error cutomizado que no permite click afuera, solo por medio de botones.
 * (Se puede encadenar con un .then() para llevar logica despues de dar click)
 */
export function swalCustomError(title: string, text?: string) {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text || "",
        allowOutsideClick: false
    });
}