// pages/userView.tsx
import { GetServerSideProps } from 'next';
import SportCenterCard from '@/components/SportCenterCard/SportCenterCard';
import { ISportCenter } from '@/interfaces/SportCenter_Interface';
import { API_URL } from "@/config/config"; 
const UserView = ({ sportCenters }: { sportCenters: ISportCenter[] }) => {



  
  return (
    <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sportCenters.map((center) => (
        <SportCenterCard key={center.id} {...center} />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${API_URL}/sportcenter/search`);
  const sportCenters = await response.json();

  return {
    props: {
      sportCenters,
    },
  };
};

export default UserView;

