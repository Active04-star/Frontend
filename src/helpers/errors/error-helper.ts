import { StatusEnum } from "@/enum/HttpStatus.enum";

export class ErrorHelper extends Error {
    error: string | undefined;
    
    constructor(public message: string, public exception?: string) {
        super(message);
        this.name = "ErrorHelper";
        this.error = exception;
    }
}

export function verifyError(message: string): StatusEnum | string {
    const is_status = Object.values(StatusEnum).includes(message as StatusEnum);
    
    if (is_status) {
        return message as StatusEnum;
    } else {
        return message;
    }
}