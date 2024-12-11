export interface IRegisterProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string;
  }
  export type IRegisterErrors = Partial<IRegisterProps>;
  