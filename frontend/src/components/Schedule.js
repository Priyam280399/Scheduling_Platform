// src/components/Schedule.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';

const Schedule = () => {
  const [availability, setAvailability] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  console.log(availability);


  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/appointments/schedule', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);

      if (response.status == 200) {
        setAppointments(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching appointments', err);
    }
  };

  const handleSchedule = async () => {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(user);

    const dateStr = availability;

    // Create a Date object
    const dateObj = new Date(dateStr);

    // Extract date components (YYYY-MM-DD format)
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = dateObj.getDate().toString().padStart(2, '0');

    // Format the date
    const formattedDate = `${year}-${month}-${day}`;

    // Extract timezone
    // const timeZone = dateStr.match(/\((.*)\)/)?.[1] || 'Unknown timezone';

    console.log('Date:', formattedDate); // "2024-11-12"
    // console.log('Time Zone:', timeZone); // "India Standard Time"


    try {
      let res = await axios.post(
        'http://localhost:5000/api/appointments/schedule',
        { userId: JSON.parse(user), date: formattedDate, timezone: "timeZone" }, // Payload data
        { headers: { Authorization: `Bearer ${token}` } } // Config (headers)
      );

      if (res.status == 201) {
        setMessage('Appointment scheduled successfully!');
        fetchAppointments();
      }

      // Refresh appointments list
    } catch (err) {
      console.error('Error scheduling appointment', err);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Schedule Appointment</h2>
      {message && <p className="success-message">{message}</p>}
      <div style={{display:'flex'}}>
        <div>
          <label>Select Availability:</label>
          <DatePicker
            onChange={setAvailability}
            value={availability}
            minDate={new Date()}
          />
        </div>
        <button onClick={handleSchedule}>Set Appointment 1</button>
      </div>

      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {new Date(appt.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
