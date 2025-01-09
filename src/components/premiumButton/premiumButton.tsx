import { IUser, IuserWithoutToken } from "@/types/zTypes";
import { Crown, AlertCircle } from "lucide-react";

interface PremiumButtonProps {
  user: IuserWithoutToken | null;
  isLoading: boolean;
  onSubscribe: () => void;
}

export const PremiumButton = ({
  user,
  isLoading,
  onSubscribe,
}: PremiumButtonProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-gray-500">
        <AlertCircle className="w-5 h-5 animate-pulse" />
        <span>Cargando...</span>
      </div>
    );
  }

  if (user?.stripeCustomerId) {
    return (
      <button
        className="w-full py-4 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed transition flex items-center justify-center space-x-2"
        disabled
      >
        <Crown className="w-5 h-5" />
        <span>Ya tienes Premium</span>
      </button>
    );
  }

  return (
    <button
      onClick={onSubscribe}
      className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
    >
      <Crown className="w-5 h-5" />
      <span>Obtener Premium</span>
    </button>
  );
};
