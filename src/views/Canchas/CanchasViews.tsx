"use client";

import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IFieldFormData, ISportCenter, IUser } from "@/types/zTypes";
import { IField } from "@/interfaces/field_Interface";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";
import { FieldCard } from "@/components/managerFields/manager_field_card";
import { AlertCircle } from "lucide-react";
import { FieldCreationSchema } from "@/types/field-schema";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";

const CanchasPanelView: React.FC = () => {
  const [canchas, setCanchas] = useState<IField[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<IFieldFormData>({
    number: 1,
    price: "100.00",
    duration_minutes: 60,
  });
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter] = useLocalStorage<ISportCenter | null>(
    "sportCenter",
    null
  );
  const [fields, setFields] = useState<IField[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const toggleView = () => {
    setShowCreateForm((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    // Parse numeric values
    if (name === "number" || name === "duration_minutes") {
      parsedValue = value === "" ? 0 : parseInt(value, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Validate the field
    try {
      FieldCreationSchema.parse({
        ...formData,
        [name]: parsedValue,
      });
      // Clear error for this field if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof Error) {
        try {
          const zodError = JSON.parse(error.message);
          const fieldErrors: Record<string, string> = {};
          zodError.forEach((err: { path: string[]; message: string }) => {
            fieldErrors[err.path[0]] = err.message;
          });

          setErrors((prev) => ({
            ...prev,
            [name]: fieldErrors[name],
          }));
        } catch {
          setErrors((prev) => ({
            ...prev,
            [name]: error.message,
          }));
        }
      }
    }
  };

  const fetchFields = useCallback(async () => {
    if (!userLocalStorage?.user?.id || !sportCenter?.id) return;
    try {
      const response: IField[] = await fetchWithAuth(
        `${API_URL}/manager/fields/${sportCenter?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("resposne", response);

      setFields(response);
    } catch (error: any) {
      swalNotifyError(error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage?.user?.id, sportCenter?.id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Activar estado de carga

    try {
      const validatedData = FieldCreationSchema.parse(formData);
      console.log("Form data is valid:", validatedData);
      const new_field = { ...formData, sportCenterId: sportCenter?.id };
      await fetchWithAuth(`${API_URL}/field`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_field),
      });
      // Notificación exitosa
      swalNotifySuccess(
        "Cancha creada con éxito",
        "La nueva cancha ha sido agregada."
      );

      // Actualizar lista de canchas
      fetchFields();

      // Resetear formulario y cambiar la vista
      setFormData({ number: 1, price: "100.00", duration_minutes: 60 });
      setShowCreateForm(false);
    } catch (error) {
      if (error instanceof Error) {
        try {
          const zodError = JSON.parse(error.message);
          const fieldErrors: Record<string, string> = {};
          zodError.forEach((err: { path: string[]; message: string }) => {
            fieldErrors[err.path[0]] = err.message;
          });
          setErrors(fieldErrors);
        } catch {
          setErrors({
            form: "Error validating form data",
          });
        }
      }
    }
    finally {
      setIsSubmitting(false); // Desactivar estado de carga
    }
  };

  useEffect(() => {
    fetchFields();
  }, [fetchFields]); // This will trigger fetchFields whenever dependencies change
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl p-6 pt-15">
        <button
          onClick={toggleView}
          className="relative  top-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center w-40 h-12 flex items-center justify-center"
        >
          {showCreateForm ? "Ver Canchas" : "Crear Canchas"}
        </button>
        {showCreateForm ? (
          <div className="rounded-lg border bg-card p-6 shadow-lg max-w-md mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-center">
              Create Field
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Formulario aquí */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Cancha
                </label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.number ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.number && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.number}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio por Hora
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="100.00"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.price && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.duration_minutes
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.duration_minutes && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.duration_minutes}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </div>
                ) : (
                  "Guardar"
                )}
              </button>
            </form>
          </div>
        ) : fields.length > 0 ? (
          <div className="pt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl font-semibold">No hay canchas disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanchasPanelView;
