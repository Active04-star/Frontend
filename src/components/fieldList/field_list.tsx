"use client";
import React, { useState } from "react";
import { IField } from "@/interfaces/field_Interface";
import Swal from "sweetalert2";
import FieldCard from "../fieldCard/fieldCard";
import { API_URL } from "@/config/config";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

interface FieldListProps {
  fields: IField[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          user={userLocalStorage}
        />
      ))}
    </div>
  );
};

export default FieldList;
