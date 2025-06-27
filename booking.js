

// ✅ booking.js

document.addEventListener('DOMContentLoaded', () => {
  const pickupSelect = document.getElementById('pickup');
  const examCenterSelect = document.getElementById('examCenter');
  const timeSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const infoDiv = document.getElementById('info');
  const searchBtn = document.getElementById('searchBtn');
  const payBtn = document.getElementById('payBtn');

  const token = localStorage.getItem('studentToken');
  if (!token) {
    alert('Please log in first to book your ticket.');
    window.location.href = 'login.html';
    return;
  }

  dateInput.valueAsDate = new Date();

  const query = new URLSearchParams(window.location.search);
  const queryParams = {
    date: query.get("date"),
    pickup: query.get("pickup"),
    examCenter: query.get("examCenter"),
    time: query.get("time")
  };

  async function fetchOptions() {
    try {
      const [pickupRes, centerRes] = await Promise.all([
        fetch('/api/pickup'),
        fetch('/api/centers')
      ]);

      const pickups = await pickupRes.json();
      const centers = await centerRes.json();

      pickupSelect.innerHTML = '<option value="">Select Pickup Point</option>';
      examCenterSelect.innerHTML = '<option value="">Select Exam Center</option>';

      pickups.forEach(p => {
        const option = document.createElement('option');
        option.value = p.name;
        option.textContent = p.name;
        pickupSelect.appendChild(option);
      });

      centers.forEach(c => {
        const option = document.createElement('option');
        option.value = c.name;
        option.textContent = c.name;
        examCenterSelect.appendChild(option);
      });

    } catch (err) {
      console.error('❌ Failed to load options:', err);
      infoDiv.textContent = 'Error loading pickup points or exam centers.';
      infoDiv.style.color = 'red';
    }
  }

  async function autoTriggerSearchFromURL() {
    if (queryParams.date && queryParams.pickup && queryParams.examCenter && queryParams.time) {
      await fetchOptions();

      dateInput.value = queryParams.date;
      pickupSelect.value = queryParams.pickup;
      examCenterSelect.value = queryParams.examCenter;
      timeSelect.value = queryParams.time;

      searchBtn.click();
    } else {
      fetchOptions();
    }
  }

  autoTriggerSearchFromURL();
  payBtn.style.display = 'none';

  searchBtn.addEventListener('click', async () => {
    infoDiv.textContent = '';
    payBtn.style.display = 'none';

    const date = dateInput.value;
    const pickup = pickupSelect.value;
    const examCenter = examCenterSelect.value;
    const time = timeSelect.value;

    if (!date || !pickup || !examCenter || !time) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/buses/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, pickup, examCenter, time })
      });

      const result = await res.json();

      if (!result.success) {
        infoDiv.textContent = '❌ No bus found or all seats booked.';
        infoDiv.style.color = 'red';
        return;
      }

      // const { name, price, seatsAvailable, time: busTime } = result.bus;

      // infoDiv.innerHTML = `
      //   ✅ <strong>Bus Found</strong><br/>
      //   🕒 Time: ${busTime}<br/>
      //   💺 Seats Left: ${seatsAvailable}<br/>
      //   💰 Price: ₹${price}
      // `;
      // infoDiv.style.color = 'green';

      // const bookingDetails = { date, pickup, examCenter, time, price };
      // localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
      // payBtn.style.display = 'inline-block';

      const { name, price, seatsAvailable, time: busTime } = result.bus;

infoDiv.innerHTML = `
  ✅ <strong>Bus Found</strong><br/>
  🕒 Time: ${busTime}<br/>
  💺 Seats Left: ${seatsAvailable}<br/>
  💰 Price: ₹${price}
`;
infoDiv.style.color = 'green';

// ✅ FIX: Added busName to bookingDetails
const bookingDetails = {
  date,
  pickup,
  examCenter,
  time,
  price,
  busName: name   // Store actual bus name
};

localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
payBtn.style.display = 'inline-block';

    } catch (err) {
      console.error('❌ Error checking bus:', err);
      infoDiv.textContent = '❌ Error checking bus availability.';
      infoDiv.style.color = 'red';
    }
  });

  payBtn.addEventListener('click', () => {
    const temp = localStorage.getItem('bookingDetails');
    if (!temp) {
      alert('No booking info found');
      return;
    }

    window.location.href = 'payment.html';
  });
});