"use client";

import { IField } from "@/interfaces/field_Interface";
import { CircleDollarSign, Clock, Hash, Activity } from "lucide-react";

interface FieldCardProps {
  field: IField;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const priceLevel = Number(field.price) > 50 ? "high" : "low";
  
  const cardStyles = {
    high: "bg-gradient-to-br from-gray-300/90 to-gray-400/90 hover:from-gray-400 hover:to-gray-500",
    low: "bg-gradient-to-br from-gray-100/90 to-gray-200/90 hover:from-gray-200 hover:to-gray-300"
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${cardStyles[priceLevel]}`}>
      <div className="relative h-48 w-full bg-white/10 flex items-center justify-center overflow-hidden">
        {/* Large Number Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Background Number (for depth effect) */}
            <span className="absolute -inset-1 text-[120px] font-bold text-white/5 blur-sm select-none">
              N°{field.number}
            </span>
            {/* Foreground Number */}
            <span className="relative text-[100px] font-bold text-white/90 select-none">
              N°{field.number}
            </span>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-xl" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-white" />
            <span className="text-3xl font-bold text-white">
              ${Number(field.price).toFixed(2)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-white border border-white/20 px-2 py-1 rounded-full text-sm backdrop-blur-sm bg-white/5">
            <Clock className="h-4 w-4" />
            {field.duration_minutes}min
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span 
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm ${
              field.isACtive 
                ? "bg-green-500/90 text-white" 
                : "bg-red-500/90 text-white"
            }`}
          >
            <Activity className="h-4 w-4" />
            {field.isACtive ? "Activa" : "Inactiva"}
          </span>
        </div>
      </div>
    </div>
  );
}