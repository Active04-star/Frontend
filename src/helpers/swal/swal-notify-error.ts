import Swal from "sweetalert2";
import { ErrorHelper, verifyError } from "../errors/error-helper";

/** Muestra un Error establecido del enum `StatusEnum`. No permite click afuera, solo por medio de botones.
 * (Se puede encadenar con un .then() para llevar logica despues de dar click)
 */
export function swalNotifyError(error: ErrorHelper) {
    const verified_error = verifyError(error.message);

    return Swal.fire({
        icon: "error",
        title: verified_error,
        text: error.error,
        allowOutsideClick: false,
    });
}