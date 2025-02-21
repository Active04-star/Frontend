
const ErrorSpan: React.FC<{errors: string[]}> = ({errors}) => {
    return (
        <div className="max-w-full w-fit h-fit flex flex-col gap-1 bg-black border-[1px] dark:border-gray-600 p-2 rounded-lg">
          {errors.map((error, i) => 
              (<span className="overflow-visible min-w-44" key={i}>- {error}</span>)
            )
          }
        </div>
    );
};

export default ErrorSpan;

// Definición de tipos
// type IUserRegister = {
//     name: string;
//     email: string;
//     password: string;
//     confirm_password: string;
//   };
  
  // Función correspondiente
  // function getUserRegister(): IUserRegister {
  //   return {
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     password: "password123",
  //     confirm_password: "password123",
  //   };
  // }
  
//   // Mapa de tipos a funciones
//   type TypeFunctionMap = {
//     userRegister: IUserRegister;
//   };
  
//   const functionMap: Record<keyof TypeFunctionMap, () => any> = {
//     userRegister: getUserRegister,
//   };
  
//   // Uso de la función con el tipo correcto
//   const result: IUserRegister = functionMap["userRegister"]();
//   console.log(result);

//   type TypeFunctionPair<T> = {
//   type: T;
//   fn: () => T;
// };

// // Ejemplo de un par
// const userRegisterPair: TypeFunctionPair<IUserRegister> = {
//   type: {} as IUserRegister,
//   fn: getUserRegister,
// };

// Llamar a la función
// const userData = userRegisterPair.fn(); // userData tiene tipo IUserRegister
// console.log(userData);

// type TypeFunctionPair<T> = {
//     type: T;
//     fn: () => T;
//   };
  
  // Ejemplo de un par
  // const userRegisterPair: TypeFunctionPair<IUserRegister> = {
  //   type: {} as IUserRegister,
  //   fn: getUserRegister,
  // };
  
  // Llamar a la función
  // const userData = userRegisterPair.fn(); // userData tiene tipo IUserRegister
  // console.log(userData);