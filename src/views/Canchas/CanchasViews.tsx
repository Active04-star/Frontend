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
  const [fields, setFields] = useState<IField[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<IFieldFormData>({
    number: 1,
    price: "100.00",
    duration_minutes: 60,
  });
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter] = useLocalStorage<ISportCenter | null>("sportCenter", null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Eliminar cancha
  const deleteField = async (fieldId: string) => {
    try {
      await fetchWithAuth(`${API_URL}/field/delete/${fieldId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      swalNotifySuccess("Campo eliminado", "El campo ha sido eliminado correctamente.");
      setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
    } catch (error: unknown) {
      swalNotifyError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  // Alternar vista
  const toggleView = () => setShowCreateForm((prevState) => !prevState);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "number" || name === "duration_minutes" ? parseInt(value, 10) || 0 : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));

    try {
      FieldCreationSchema.parse({ ...formData, [name]: parsedValue });
      setErrors((prevErrors) => {
        const { [name]: _, ...remainingErrors } = prevErrors;
        return remainingErrors;
      });
    } catch (validationError: unknown) {
      if (validationError instanceof Error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError.message }));
      }
    }
  };

  // Obtener lista de canchas
  const fetchFields = useCallback(async () => {
    if (!userLocalStorage?.user?.id || !sportCenter?.id) return;
    try {
      const response: IField[] = await fetchWithAuth(`${API_URL}/manager/fields/${sportCenter?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setFields(response);
    } catch (error: unknown) {
      swalNotifyError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage?.user?.id, sportCenter?.id]);

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validatedData = FieldCreationSchema.parse(formData);
      const newField = { ...validatedData, sportCenterId: sportCenter?.id };
      await fetchWithAuth(`${API_URL}/field`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newField),
      });
      swalNotifySuccess("Cancha creada con éxito", "La nueva cancha ha sido agregada.");
      fetchFields();
      setFormData({ number: 1, price: "100.00", duration_minutes: 60 });
      setShowCreateForm(false);
    } catch (error: unknown) {
      swalNotifyError(error instanceof Error ? error.message : "Error en la validación del formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

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
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleView}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center w-40 h-12 flex items-center justify-center mt-[200px]"
          >
            {showCreateForm ? "Ver Canchas" : "Crear Canchas"}
          </button>
        </div>
        {showCreateForm ? (
          <div className="rounded-lg border bg-card p-6 shadow-lg max-w-md mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-center">Crear Cancha</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Número de Cancha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cancha</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-black ${errors.number ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2`}
                />
                {errors.number && <div className="mt-1 text-sm text-red-500">{errors.number}</div>}
              </div>
              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio por Hora</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-black ${errors.price ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2`}
                />
                {errors.price && <div className="mt-1 text-sm text-red-500">{errors.price}</div>}
              </div>
              {/* Duración */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-black ${errors.duration_minutes ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2`}
                />
                {errors.duration_minutes && <div className="mt-1 text-sm text-red-500">{errors.duration_minutes}</div>}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} onDelete={deleteField} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanchasPanelView;
