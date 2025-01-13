import { FaUsers, FaCogs, FaChartBar, FaDollarSign } from "react-icons/fa"; 
import { ViewName } from "@/app/admin/page";

type Card = {
  name: string;
  icon: React.ReactNode; 
  viewName: ViewName;
};

const cards: Card[] = [
  {
    name: "Managers Premium",
    icon: <FaDollarSign size={40} className="text-red-500" />, 
    viewName: "managers",
  },
  {
    name: "Centros Deportivos",
    icon: <FaChartBar size={40} className="text-green-500" />, 
    viewName: "centroDepotivos",
  },
  {
    name: "Clientes",
    icon:  <FaUsers size={40} className="text-blue-500" />, 
    viewName: "clientes",
  },
  {
    name: "Configuración",
    icon: <FaCogs size={40} className="text-gray-500" />, 
    viewName: "settings",
  },
];

const InicioView = ({ onCardClick }: { onCardClick: (viewName: ViewName) => void }) => {
  return (
    <div className="container mx-auto p-6 flex gap-4 pt-24 ">
    {cards.map((card, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow w-60 h-56"
        onClick={() => onCardClick(card.viewName)}
      >
        <div className="relative h-32 flex justify-center items-center">
          {card.icon}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center text-black">
            {card.name}
          </h3>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default InicioView;
