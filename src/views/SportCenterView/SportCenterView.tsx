'use client'

//import { getSportCentersDB } from '@/helpers/sportCenters_helpers'; // Debes crear esta función para obtener los datos de la DB
// import React, { useEffect, useState } from 'react';               // a usarse en el futuro , comentado para hacer build 
import { SportCenterStatus } from '@/enum/sportCenterStatus';
import { UserRole } from '@/enum/userRole';
import { SubscriptionStatus } from '@/enum/SubscriptionStatus';
import { ISportCenter } from '@/interfaces/sport_center.interface';


const SportCenterView = () => {
  // Datos harcodeados según la estructura de la interfaz ISportCenter
  const sportCenters: ISportCenter[] = [

    {
      id: "string",
    name: "string",
    address: "string",
    averageRating: 10,  // Valoración promedio puede ser nulo o no proporcionado
    isDeleted: false,
    status: SportCenterStatus.PUBLISHED,
    photos: [],  // Relación con las fotos, opcional
    schedules:[],  // Relación con los horarios, opcional
    fields: [],  // Relación con los campos de deportes, opcional
    mainManager: {name:"user",id:'udhweuo',email:'email.com',subscription_status:SubscriptionStatus.ACTIVE,role:UserRole.MAIN_MANAGER,was_banned:false},  
    sportCategories: []// Relación con las categorías deportivas, opcional
    },

  ];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Iterar sobre cada SportCenter */}
      {sportCenters.map((center) =>
        // Iterar sobre cada field dentro de fields de SportCenter
        // center.fields.map((field) => (
        //   <FieldCard  key={field.id} {...field} />
        // ))
        null
      )}
    </div>
  );
};

export default SportCenterView;