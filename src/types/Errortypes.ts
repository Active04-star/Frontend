type InnerError = {
    _errors: string[]
}

export type RegisterErrors = {
    name?: InnerError;
    email?: InnerError;
    password?: InnerError;
    confirm_password?: InnerError;
    profile_image?: InnerError;
}