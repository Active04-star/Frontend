import NavbarUser from '@/components/navbarUser/navbarUser';
import ShiftsList from '@/views/ShiftsListView/ShiftsListView';
import React from 'react';

const Shifts: React.FC = () => {
  return (
    <>
    <NavbarUser/>
    <div className="min-h-screen bg-gray-100">
      <ShiftsList />
    </div>
    </>
  );
};

export default Shifts;
