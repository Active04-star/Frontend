"use client"
import React, { useEffect, useState } from 'react';
import { Clock, Loader2, CheckCircle2 } from 'lucide-react';
import BotonVolver from '@/components/back-button/back-button';
import { useLocalStorage } from '@/helpers/auth/useLocalStorage';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/config/config';
import { fetchWithAuth } from '@/helpers/errors/fetch-with-token-interceptor';

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

interface Schedule {
  day: DayOfWeek;
  isOpen: boolean;
  opening_time: string | null;
  closing_time: string | null;
}

const initialSchedules: Schedule[] = Object.values(DayOfWeek).map((day) => ({
  day,
  isOpen: true,
  opening_time: '09:00',
  closing_time: '18:00',
}));

export default function ScheduleForm() {
  const [userLocalStorage] = useLocalStorage("userSession", null);
  const { token, user } = userLocalStorage || { token: null, user: null };
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    
    if (!user || !token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, token, router]);


  const handleScheduleChange = (
    index: number,
    field: keyof Schedule,
    value: string | boolean
  ) => {
    const newSchedules = [...schedules];
    if (field === 'isOpen') {
      const isOpen = value as boolean;
      newSchedules[index] = {
        ...newSchedules[index],
        isOpen,
        opening_time: isOpen ? newSchedules[index].opening_time || '09:00' : null,
        closing_time: isOpen ? newSchedules[index].closing_time || '18:00' : null,
      };
    } else {
      newSchedules[index] = { ...newSchedules[index], [field]: value };
    }
    setSchedules(newSchedules);    
  };
  useEffect(() => {
    console.log('schedulestosendintochange', schedules);
  }, [schedules]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
console.log('shcuedles',schedules);

    try {
      const schedulesToSubmit = schedules.map(schedule => ({
        day: schedule.day,
        is_open: schedule.isOpen,
        opening_time: schedule.opening_time,
        closing_time: schedule.closing_time
      }));
      console.log('shceudlesto sumb',schedulesToSubmit);
      
      console.log('shceudlesto sumb',JSON.stringify(schedulesToSubmit));

      await fetchWithAuth(`${API_URL}/schedules/create/${user?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedulesToSubmit)
      });


      setShowSuccess(true);
      setIsSubmitting(false); 

      await new Promise(resolve => setTimeout(resolve, 1500));

      router.push('/manager');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 flex items-center justify-center">
        <div className="text-white flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg">Cargando informacion del usuario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <BotonVolver/>
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Horarios guardados, redireccionando...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sport Center Schedule</h2>
          
          <div className="space-y-6">
            {schedules.map((schedule, index) => (
              <div key={schedule.day} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {schedule.day.charAt(0) + schedule.day.slice(1).toLowerCase()}
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schedule.isOpen}
                        onChange={(e) => handleScheduleChange(index, 'isOpen', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {schedule.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </label>
                  </div>
                </div>

                {schedule.isOpen && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opening Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="time"
                          value={schedule.opening_time || ''}
                          onChange={(e) => handleScheduleChange(index, 'opening_time', e.target.value)}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required={schedule.isOpen}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Closing Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="time"
                          value={schedule.closing_time || ''}
                          onChange={(e) => handleScheduleChange(index, 'closing_time', e.target.value)}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required={schedule.isOpen}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving Schedule...
                </>
              ) : (
                'Save Schedule'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}