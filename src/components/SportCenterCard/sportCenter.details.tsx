import React, { useState } from "react";
import { MapPin, Star, Clock, Loader, Check, X } from "lucide-react";
import { ISportCenterSchedule } from "@/interfaces/sportCenter_schedule_interface";
import Link from "next/link";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";

interface SportCenterDetailsProps {
  id: string;
  name: string;
  address: string;
  averageRating: number;
  schedules: ISportCenterSchedule[];
  onUpdateSuccess: () => void;
}

const DAYS_OF_WEEK = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export default function SportCenterDetails({
  id,
  name,
  address,
  averageRating,
  schedules,
  onUpdateSuccess,
}: SportCenterDetailsProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedAddress, setEditedAddress] = useState(address);
  const [nameError, setNameError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDoubleClick = (field: "name" | "address") => {
    if (field === "name") {
      setIsEditingName(true);
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "address"
  ) => {
    const value = e.target.value;
    if (field === "name") {
      setEditedName(value);
    } else {
      setEditedAddress(value);
    }
  };

  const updateSportCenter = async (
    field: "name" | "address",
    value: string
  ) => {
    setIsUpdating(true);
    try {
      await fetchWithAuth(`${API_URL}/manager/update-sportcenter/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      onUpdateSuccess();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSave = async (field: "name" | "address") => {
    if (field === "name" && !nameError) {
      await updateSportCenter("name", editedName);
      setIsEditingName(false);
    } else if (field === "address" && !addressError) {
      await updateSportCenter("address", editedAddress);
      setIsEditingAddress(false);
    }
  };

  const handleCancel = (field: "name" | "address") => {
    if (field === "name") {
      setEditedName(name);
      setIsEditingName(false);
      setNameError(null);
    } else {
      setEditedAddress(address);
      setIsEditingAddress(false);
      setAddressError(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => handleChange(e, "name")}
                  className="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleSave("name")}
                  disabled={!!nameError || isUpdating}
                  className="ml-2 text-green-500"
                >
                  {isUpdating ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleCancel("name")}
                  disabled={isUpdating}
                  className="ml-2 text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div
                className="text-xl font-semibold text-gray-900 relative group cursor-pointer"
                onDoubleClick={() => handleDoubleClick("name")}
              >
                <span>{name}</span>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 text-sm text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Haz doble clic para actualizar
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center mt-3">
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            {isEditingAddress ? (
              <>
                <input
                  type="text"
                  value={editedAddress}
                  onChange={(e) => handleChange(e, "address")}
                  className="text-sm text-gray-500 border-b-2 border-blue-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleSave("address")}
                  disabled={!!addressError || isUpdating}
                  className="ml-2 text-green-500"
                >
                  {isUpdating ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleCancel("address")}
                  disabled={isUpdating}
                  className="ml-2 text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div
              className="text-xl  relative group cursor-pointer"
              onDoubleClick={() => handleDoubleClick("address")}>
                <span
                  className="text-sm text-gray-500 "
                >
                  {address || "Haz doble clic para agregar una dirección"}
                </span>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 text-sm text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Haz doble clic para actualizar
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Horarios
          </h3>
          {schedules.length === 0?(
            <Link
              href="/horarios"
              className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md transition-colors"
            >
              Agregar horarios
            </Link>
          ):(
            <Link
            href="/horarios"
            className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md  transition-colors"
          >
            Actualizar horarios
          </Link>
          )}
        </div>

        {schedules.length > 0 ? (
          <div className="grid grid-cols-7 gap-2 text-center">
            {Object.entries(DAYS_OF_WEEK).map(([key, dayName]) => {
              const daySchedule = schedules.find((s) => s.day === key);
              return (
                <div key={key} className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    {dayName}
                  </span>
                  <div className="text-xs text-gray-500">
                    {daySchedule?.isOpen ? (
                      <>
                        <div>{daySchedule.opening_time}</div>
                        <div>{daySchedule.closing_time}</div>
                      </>
                    ) : (
                      <span className="text-red-500">Cerrado</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No hay horarios configurados
          </p>
        )}
      </div>
    </div>
  );
}
