import { HttpMessagesEnum } from "@/enums/httpMessages.enum";

export class ErrorHelper extends Error {
    error: string | undefined;
    
    constructor(public message: string, public exception?: string) {
        super(message);
        this.name = "ErrorHelper";
        this.error = exception;
    }
}

export function verifyError(message: string): HttpMessagesEnum {
    const is_status = Object.values(HttpMessagesEnum).includes(message as HttpMessagesEnum);
    
    if (is_status) {
        return message as HttpMessagesEnum;
    } else {
        return HttpMessagesEnum.UNKNOWN_ERROR;
    }
}