"use client";
import Navbar from '@/components/navbar/navbar'
import { UserRole } from '@/enum/userRole';
import { useLocalStorage } from '@/helpers/auth/useLocalStorage';
import { IUser } from '@/types/zTypes';
import SettingsView from '@/views/SettingsView/SettingsView'
import React from 'react'

const Settings = () => {
    const [user] = useLocalStorage<IUser | null>("userSession", null);
  
    if (user?.user === undefined || user?.user.role === UserRole.ADMIN || user?.user.role === UserRole.USER) {
      window.location.href = "/";
      return (<div className="flex min-h-screen"></div>);
  
    }
  return (
    <>
      <Navbar />
      <SettingsView />
    </>
  )
}

export default Settings;