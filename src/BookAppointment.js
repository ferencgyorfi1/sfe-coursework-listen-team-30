import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './utils/firebase';

function BookAppointment({ user }) {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBookAppointment = async () => {
    try {
      // Validate appointment data
      if (!appointmentDate || !appointmentTime) {
        throw new Error('Please select appointment date and time.');
      }

      // Construct appointment data
      const appointmentData = {
        userId: user ? user.uid : '', // Check if user is not null before accessing uid
        userName: user ? user.email : '', // Check if user is not null before accessing email
        date: appointmentDate,
        time: appointmentTime,
      };

      // Add appointment to Firestore
      const appointmentsRef = collection(firestore, 'appointments');
      await addDoc(appointmentsRef, appointmentData);

      // Reset form and show success message
      setAppointmentDate('');
      setAppointmentTime('');
      setSuccessMessage('Appointment booked successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h3>Book Appointment</h3>
      <label>
        Date:
        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Time:
        <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
      </label>
      <br />
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleBookAppointment}>Book Appointment</button>
    </div>
  );
}

export default BookAppointment;
