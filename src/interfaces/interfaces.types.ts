export interface IRegisterProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string;
  }
  export type IRegisterErrors = Partial<IRegisterProps>;
  
  export interface IloginProps {
    email: string;
    password: string;
  }

  export type IErrorsProps = Partial<IloginProps>;
