import { Check } from 'lucide-react';

interface PremiumFeatureProps {
  text: string;
}

export const PremiumFeature = ({ text }: PremiumFeatureProps) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0 p-1">
      <Check className="w-5 h-5 text-yellow-500" />
    </div>
    <span className="text-gray-700">{text}</span>
  </li>
);