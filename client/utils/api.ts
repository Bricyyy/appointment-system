export const fetchAppointments = async () => {
    const response = await fetch('/api/appointments');
    return response.json();
  };
  
  export const createAppointment = async (appointment: any) => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });
    return response.json();
  };
  