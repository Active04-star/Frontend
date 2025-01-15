import Navbar from "@/components/navbar/navbar";
import ReservacionesUsersView from "@/views/reservacionesUserView/reservacionesUsersView";
import React from "react";

const reservacionesUsers = () => {
  return (
    <>
      <Navbar />
      <ReservacionesUsersView />
    </>
  );
};

export default reservacionesUsers;
