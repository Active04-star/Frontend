import Swal, { SweetAlertPosition } from "sweetalert2";

<<<<<<< HEAD:src/helpers/swal/swal-notify-success.ts
=======
/**
 * Muestra una notificacion, con opciones por parametros mas amplias:
 * @param title Titulo de notificacion
 * @param text Parrafo de notificacion
 * @param options Un array con dos indices: `[(SweetAlertPosition), (timer en milisegundos)]` ejemplo: `["center-right", 5000]`
 * @returns 
 */
>>>>>>> 59ae47ab60899040ee23e9bc9c6dcc9558601d73:src/scripts/swal/swal-notify-success.ts
export function swalNotifySuccess(title: string, text: string, options?: [position?: SweetAlertPosition | undefined, timer?: number]) {
    let position_: SweetAlertPosition | undefined;
    let timer_: number | undefined;

    if (options) {
        const [position, timer] = options;
        [position_, timer_] = [position, timer];
    }

    position_ = (position_ === undefined) ? "top-end" : position_;

    const no_time: boolean = (timer_ === 0 && timer_ !== undefined);
    
    const time_3000: boolean = (timer_ === undefined);

    const Toast = Swal.mixin({
        toast: true,
        position: position_,
        showConfirmButton: no_time,
        timer: no_time ? undefined : time_3000 ? 3000 : timer_,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    return Toast.fire({
        icon: "success",
        title: title,
        text: text === "" ? undefined : text,
    });
}