import { IField } from "@/interfaces/field_Interface";
import React, { useEffect, useState } from "react";

const AddOrEditField: React.FC<
    { onSubmit: (data: IField) => void } &
    { originalData?: IField, showPopup: (visible: boolean) => void }
> = ({ showPopup, onSubmit, originalData }) => {

    const initialState: Partial<IField> = { number: 0, price: "", photos: [] };
    const [fieldData, setFieldData] = useState<Partial<IField>>(initialState);
    const [errorMessage, setErrorMessage] = useState<Partial<IField>>(initialState);

    const exitPopup = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (event.target === event.currentTarget) {
            if (showPopup) {
                showPopup(false);
            }
        }
    };
    useEffect(() => {
        if (originalData?.number !== undefined && originalData?.price !== undefined) {
            setFieldData(originalData);
        }
    }, [originalData]);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        // if (errorMessage.number === 0 && errorMessage.price === "" && errorMessage.description === "") {
        //     if (fieldData.name !== "" && fieldData.price !== "") {
        //         onSubmit(fieldData as SoftDish);
        //         showPopup(false);
        //     }
        // }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (fieldData?.price !== undefined && name === "price") {
            if ((fieldData?.price.match(/\./g) || []).length > 1) {
                setErrorMessage({ ...errorMessage, price: "El precio debe poseer solo un punto" });
                return;
            }

            if (!/^\d*\.?\d{0,2}$/.test(value)) {
                setErrorMessage({ ...errorMessage, price: "El precio debe ser numerico, Maximo dos decimales" });
                return;
            }
        }

        setFieldData({
            ...fieldData,
            [name]: value,
        });
    };

    return (
        <div onClick={exitPopup} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo producto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Numero de la cancha</label>
                        <input
                            type="text"
                            name="number"
                            value={fieldData?.number}
                            required
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errorMessage?.number && <p className="text-sm text-red-600" style={{ fontSize: "12px" }}>{errorMessage.number}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                            type="text"
                            name="description"
                            value={fieldData?.price}
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errorMessage?.price && <p className="text-sm text-red-600" style={{ fontSize: "12px" }}>{errorMessage.price}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Categoria:</label>
                        <input
                            type="text"
                            name="price"
                            value={fieldData?.price}
                            required
                            placeholder="123.45"
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={exitPopup}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg py-1.5 px-4 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrEditField;