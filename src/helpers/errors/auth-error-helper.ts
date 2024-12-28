import { ErrorHelper } from "./error-helper";
import { swalNotifyError } from "../swal/swal-notify-error";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthErrorHelper(error: any) {
  if (error.message === ApiStatusEnum.INSUFFICIENT_PERMISSIONS) {

    swalNotifyError(new ErrorHelper(ApiStatusEnum.INSUFFICIENT_PERMISSIONS, "")).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";

      }
    });

    return;
  } else if (error.message === ApiStatusEnum.TOKEN_EXPIRED) {

    swalNotifyError(new ErrorHelper(ApiStatusEnum.TOKEN_EXPIRED, "Cerrando sesion")).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
        localStorage.clear();

      }
    });;

    return;
  } else if (error.message !== ApiStatusEnum.UNKNOWN_ERROR) {
    console.log(error);
    swalNotifyError(error);

    return;
  } else {
    console.log(error);
  }
}