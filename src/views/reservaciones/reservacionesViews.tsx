"use client";
import ReservationCard from "@/components/managerReservations/reservationCardd";
import { API_URL } from "@/config/config";
import { ReservationStatus } from "@/enum/ReservationStatus";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { IReservation } from "@/interfaces/reservation_Interface";
import { IUser } from "@/types/zTypes";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReservacionesViews: React.FC = () => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (!userLocalStorage?.user?.id) return;
    try {
      const response: IReservation[] = await fetchWithAuth(
        `${API_URL}/manager/reservations/${userLocalStorage.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setReservations(response);
    } catch (error: any) {
      swalNotifyError(error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage?.user?.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const filterReservations = (status: string) => {
    return reservations.filter((reservation) => reservation.status === status);
  };
  const handleComplete = async (id: string) => {
    setCompletingId(id);

    try {
      await fetchWithAuth(`${API_URL}/reservation/complete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status: ReservationStatus.COMPLETED }
            : reservation
        )
      );
      swalConfirmation("Reservacion completada");
    } catch (error: any) {
      swalNotifyError(error);
    } finally {
      setCompletingId(null);
    }
  };

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      setCancellingId(id);
      try {
        await fetchWithAuth(`${API_URL}/reservation/cancel/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id
              ? { ...reservation, status: ReservationStatus.CANCELLED }
              : reservation
          )
        );
        swalConfirmation("Reservacion Cancelada");
      } catch (error: any) {
        swalNotifyError(error);
      } finally {
        setCancellingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Reservations Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-600">Activas</h2>
          {filterReservations("active").map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onCancel={handleCancel}
              isCompleting={completingId === reservation.id}
              isCancelling={cancellingId === reservation.id}
            />
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Completadas
          </h2>
          {filterReservations("completed").map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              isCompleting={false}
              isCancelling={false}
            />
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Canceladas
          </h2>
          {filterReservations("cancelled").map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              isCompleting={false}
              isCancelling={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservacionesViews;
