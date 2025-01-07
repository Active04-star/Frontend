import Navbar from '@/components/navbar/navbar';
import ShiftsList from '@/views/ShiftsListView/ShiftsListView';
import React from 'react';

const Shifts: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <ShiftsList />
      </div>
    </>
  );
};

export default Shifts;
