import { ErrorHelper } from "./error-helper";
import { swalNotifyError } from "../swal/swal-notify-error";
import { StatusEnum } from "@/enum/HttpStatus.enum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthErrorHelper(error: any) {
  if (error.message === StatusEnum.INSUFFICIENT_PERMISSIONS) {

    swalNotifyError(new ErrorHelper(StatusEnum.INSUFFICIENT_PERMISSIONS, "")).then((result) => {
      if (result.isConfirmed) {
        //TODO CAMBIAR ESTO
        // window.location.href = "/pageUser";

      }
    });

    return;
  } else if (error.message === StatusEnum.TOKEN_EXPIRED) {

    swalNotifyError(new ErrorHelper(StatusEnum.TOKEN_EXPIRED, "Cerrando sesion")).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
        localStorage.clear();

      }
    });;

    return;
  } else if (error.message !== StatusEnum.UNKNOWN_ERROR) {
    console.log("Unknown here")
    swalNotifyError(error);

    return;
  } else {
    console.log(error);
  }
}