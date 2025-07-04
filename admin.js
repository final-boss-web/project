

// let token = localStorage.getItem('adminToken') || null;
// let buses = [], pickups = [], centers = [], students = [], bookings = [];
// let editingBusId = null;

// window.addEventListener('DOMContentLoaded', async () => {
//   if (token) {
//     document.getElementById('loginForm').style.display = 'none';
//     document.getElementById('panel').style.display = 'block';
//     await loadPickups();
//     await loadCenters();
//     await loadBuses();
//     await loadStudents();
//     await loadBookings();
//     await loadAdmins();
//     showSection('studentsSection');
//   }
// });

// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     document.getElementById('error').textContent = '';
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value.trim();

//     try {
//       const res = await fetch('http://localhost:3000/admin/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
//       const data = await res.json();
//       token = data.token;
//       localStorage.setItem('adminToken', token);
//       document.getElementById('loginForm').style.display = 'none';
//       document.getElementById('panel').style.display = 'block';
//       await loadPickups();
//       await loadCenters();
//       await loadBuses();
//       await loadStudents();
//       await loadBookings();
//       await loadAdmins();
//       showSection('studentsSection');
//     } catch (err) {
//       document.getElementById('error').innerText = err.message;
//     }
//   });
// }

// function logout() {
//   localStorage.removeItem('adminToken');
//   location.reload();
// }

// function showSection(id) {
//   document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
//   document.getElementById(id).style.display = 'block';
// }

// // ---------------------- Admin ----------------------
// async function loadAdmins() {
//   try {
//     const res = await fetch('http://localhost:3000/admins', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const admins = await res.json();
//     const list = document.getElementById('adminList');
//     list.innerHTML = admins.map(a =>
//       `<li>${a.email} <button onclick="deleteAdmin('${a._id}')">❌</button></li>`
//     ).join('');
//   } catch (err) {
//     alert('Failed to load admins');
//   }
// }

// async function addAdmin() {
//   const email = document.getElementById('adminEmail').value.trim();
//   const password = document.getElementById('adminPassword').value.trim();
//   if (!email || !password) return alert('Enter both email and password');

//   try {
//     const res = await fetch('http://localhost:3000/admin/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ email, password })
//     });
//     if (!res.ok) return alert((await res.json()).error || 'Failed to add admin');
//     document.getElementById('adminEmail').value = '';
//     document.getElementById('adminPassword').value = '';
//     await loadAdmins();
//   } catch (err) {
//     alert(err.message);
//   }
// }

// async function deleteAdmin(id) {
//   if (!confirm('Delete this admin?')) return;
//   try {
//     const res = await fetch(`http://localhost:3000/admin/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (!res.ok) throw new Error('Failed to delete admin');
//     await loadAdmins();
//   } catch (err) {
//     alert(err.message);
//   }
// }

// // ---------------------- Pickups ----------------------
// async function loadPickups() {
//   const res = await fetch('http://localhost:3000/api/pickup', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   pickups = await res.json();
//   renderPickups();
//   loadPickupCheckboxes();
// }
// function renderPickups() {
//   const list = document.getElementById('pickupList');
//   list.innerHTML = pickups.map(p => `<li>${p.name} <button onclick="removePickup('${p._id}')">❌</button></li>`).join('');
// }
// function loadPickupCheckboxes() {
//   const div = document.getElementById('pickupCheckboxes');
//   div.innerHTML = pickups.map(p => `<label><input type="checkbox" value="${p.name}">${p.name}</label><br>`).join('');
// }
// async function addPickup() {
//   const name = document.getElementById('pickupInput').value.trim();
//   if (!name) return alert('Enter pickup name');
//   try {
//     const res = await fetch('http://localhost:3000/api/pickup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ name })
//     });
//     if (!res.ok) return alert((await res.json()).error || 'Failed to add pickup');
//     document.getElementById('pickupInput').value = '';
//     await loadPickups();
//   } catch (err) {
//     alert(err.message);
//   }
// }
// async function removePickup(id) {
//   if (!confirm('Delete this pickup?')) return;
//   try {
//     const res = await fetch(`http://localhost:3000/api/pickup/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (!res.ok) throw new Error('Failed to delete pickup');
//     await loadPickups();
//   } catch (err) {
//     alert(err.message);
//   }
// }

// // ---------------------- Centers ----------------------
// async function loadCenters() {
//   const res = await fetch('http://localhost:3000/api/centers');
//   centers = await res.json();
//   renderCenters();
//   loadCentersSelect();
// }
// function renderCenters() {
//   const list = document.getElementById('centerList');
//   list.innerHTML = centers.map(c => `<li>${c.name} <button onclick="removeCenter('${c._id}')">❌</button></li>`).join('');
// }
// function loadCentersSelect() {
//   const select = document.getElementById('examCenterSelect');
//   select.innerHTML = `<option value="">--Select--</option>` + centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
// }
// async function addCenter() {
//   const name = document.getElementById('centerInput').value.trim();
//   if (!name) return alert('Enter center name');
//   try {
//     const res = await fetch('http://localhost:3000/api/centers', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ name })
//     });
//     if (!res.ok) return alert((await res.json()).error || 'Failed to add center');
//     document.getElementById('centerInput').value = '';
//     await loadCenters();
//   } catch (err) {
//     alert(err.message);
//   }
// }
// async function removeCenter(id) {
//   if (!confirm('Delete this center?')) return;
//   try {
//     const res = await fetch(`http://localhost:3000/api/centers/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (!res.ok) throw new Error('Failed to delete center');
//     await loadCenters();
//   } catch (err) {
//     alert(err.message);
//   }
// }

// // ---------------------- Buses ----------------------
// async function loadBuses() {
//   const res = await fetch('http://localhost:3000/api/buses', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   buses = await res.json();
//   renderBuses();
// }
// function renderBuses() {
//   const list = document.getElementById('busList');
//   list.innerHTML = buses.map(bus => `
//     <li>
//       ${bus.name} - ${bus.date.split('T')[0]} (${bus.timing}) - ${bus.pickupPoints.join(', ')} → ${bus.examCenter} ₹${bus.price}
//       <button onclick="editBus('${bus._id}')">✏️</button>
//       <button onclick="deleteBus('${bus._id}')">❌</button>
//     </li>`).join('');
// }

// // ...addBus, editBus, updateBus, deleteBus code remains same as earlier...

// // ---------------------- Students ----------------------
// async function loadStudents() {
//   try {
//     const res = await fetch('http://localhost:3000/api/students', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (!res.ok) throw new Error('Failed to load students');
//     students = await res.json();
//     renderStudents();
//   } catch (err) {
//     alert(err.message);
//   }
// }
// function renderStudents() {
//   const list = document.getElementById('studentsList');
//   if (!list) return;
//   if (students.length === 0) {
//     list.innerHTML = '<li>No students registered yet.</li>';
//   } else {
//     list.innerHTML = students.map(s => `
//       <li>
//         <strong>${s.name}</strong><br>
//         Roll: ${s.university}<br>
//         Email: ${s.email}<br>
//         Mobile: ${s.mobile}<br>
//         Parent: ${s.parentmobile}
//       </li>`).join('');
//   }
// }

// // ---------------------- Bookings ----------------------
// async function loadBookings() {
//   try {
//     const res = await fetch('http://localhost:3000/api/bookings', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (!res.ok) throw new Error('Failed to load bookings');
//     bookings = await res.json();
//     renderBookings();
//   } catch (err) {
//     alert(err.message);
//   }
// }
// function renderBookings() {
//   const list = document.getElementById('bookingsList');
//   if (!list) return;
//   if (bookings.length === 0) {
//     list.innerHTML = '<li>No bookings found.</li>';
//   } else {
//     list.innerHTML = bookings.map(b => {
//       const studentName = b.studentId?.name || 'Unknown Student';
//       const studentEmail = b.studentId?.email || '';
//       const studentMobile = b.studentId?.mobile || '';
//       const busName = b.busId?.name || 'Unknown Bus';
//       const date = b.date?.split('T')[0] || 'N/A';
//       const pickup = b.pickupPoint || '';
//       const center = b.examCenter || '';
//       const price = b.price || '';
//       const time = b.time || '';
//       const bookingId = b._id;

//       return `
//         <li>
//           <strong>${studentName}</strong> - ${studentEmail} (${studentMobile})<br>
//           Booked <strong>${busName}</strong> on ${date}<br>
//           Pickup: ${pickup}, Center: ${center}, Time: ${time}, ₹${price}
//           <br>
//           <button onclick="cancelBookingAsAdmin('${bookingId}')">❌ Cancel</button>
//         </li>`;
//     }).join('');
//   }
// }

// async function cancelBookingAsAdmin(bookingId) {
//   const res = await fetch(`/admin/bookings/${bookingId}`, {
//     method: 'DELETE',
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   const data = await res.json();
//   if (res.ok) {
//     alert("✅ Booking cancelled successfully");
//     await loadBookings();
//   } else {
//     alert(`❌ ${data.message || "Error cancelling booking"}`);
//   }
// }

// // ---------------------- Downloads ----------------------
// function downloadStudents() {
//   fetch('http://localhost:3000/admin/export/students', {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//     .then(res => res.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'students.xlsx';
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     });
// }

// function downloadBookings() {
//   fetch('http://localhost:3000/admin/export/bookings', {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//     .then(res => res.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'bookings.xlsx';
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     });
// }
// admin.js

let token = localStorage.getItem('adminToken') || null;
let buses = [], pickups = [], centers = [], students = [], bookings = [];
let editingBusId = null;

window.addEventListener('DOMContentLoaded', async () => {
  if (token) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('panel').style.display = 'block';
    await loadPickups();
    await loadCenters();
    await loadBuses();
    await loadStudents();
    await loadBookings();
    await loadAdmins();
    showSection('studentsSection');
  }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('error').textContent = '';
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
      const data = await res.json();
      token = data.token;
      localStorage.setItem('adminToken', token);
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('panel').style.display = 'block';
      await loadPickups();
      await loadCenters();
      await loadBuses();
      await loadStudents();
      await loadBookings();
      await loadAdmins();
      showSection('studentsSection');
    } catch (err) {
      document.getElementById('error').innerText = err.message;
    }
  });
}

function logout() {
  localStorage.removeItem('adminToken');
  location.reload();
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// ---------------------- Admin ----------------------
async function loadAdmins() {
  try {
    const res = await fetch('http://localhost:3000/admins', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const admins = await res.json();
    const list = document.getElementById('adminList');
    list.innerHTML = admins.map(a =>
      `<li>${a.email} <button onclick="deleteAdmin('${a._id}')">❌</button></li>`
    ).join('');
  } catch {
    alert('Failed to load admins');
  }
}

async function addAdmin() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value.trim();
  if (!email || !password) return alert('Enter both email and password');

  try {
    const res = await fetch('http://localhost:3000/admin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return alert((await res.json()).error || 'Failed to add admin');
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
    await loadAdmins();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteAdmin(id) {
  if (!confirm('Delete this admin?')) return;
  try {
    const res = await fetch(`http://localhost:3000/admin/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete admin');
    await loadAdmins();
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Pickups ----------------------
async function loadPickups() {
  const res = await fetch('http://localhost:3000/api/pickup', {
    headers: { Authorization: `Bearer ${token}` }
  });
  pickups = await res.json();
  renderPickups();
  loadPickupCheckboxes();
}

function renderPickups() {
  const list = document.getElementById('pickupList');
  list.innerHTML = pickups.map(p => `<li>${p.name} <button onclick="removePickup('${p._id}')">❌</button></li>`).join('');
}

function loadPickupCheckboxes() {
  const div = document.getElementById('pickupCheckboxes');
  div.innerHTML = pickups.map(p => `<label><input type="checkbox" value="${p.name}">${p.name}</label><br>`).join('');
}

async function addPickup() {
  const name = document.getElementById('pickupInput').value.trim();
  if (!name) return alert('Enter pickup name');
  try {
    const res = await fetch('http://localhost:3000/api/pickup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name })
    });
    if (!res.ok) return alert((await res.json()).error || 'Failed to add pickup');
    document.getElementById('pickupInput').value = '';
    await loadPickups();
  } catch (err) {
    alert(err.message);
  }
}

async function removePickup(id) {
  if (!confirm('Delete this pickup?')) return;
  try {
    const res = await fetch(`http://localhost:3000/api/pickup/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete pickup');
    await loadPickups();
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Centers ----------------------
async function loadCenters() {
  const res = await fetch('http://localhost:3000/api/centers');
  centers = await res.json();
  renderCenters();
  loadCentersSelect();
}

function renderCenters() {
  const list = document.getElementById('centerList');
  list.innerHTML = centers.map(c => `<li>${c.name} <button onclick="removeCenter('${c._id}')">❌</button></li>`).join('');
}

function loadCentersSelect() {
  const select = document.getElementById('examCenterSelect');
  select.innerHTML = `<option value="">--Select--</option>` + centers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

async function addCenter() {
  const name = document.getElementById('centerInput').value.trim();
  if (!name) return alert('Enter center name');
  try {
    const res = await fetch('http://localhost:3000/api/centers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name })
    });
    if (!res.ok) return alert((await res.json()).error || 'Failed to add center');
    document.getElementById('centerInput').value = '';
    await loadCenters();
  } catch (err) {
    alert(err.message);
  }
}

async function removeCenter(id) {
  if (!confirm('Delete this center?')) return;
  try {
    const res = await fetch(`http://localhost:3000/api/centers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete center');
    await loadCenters();
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Buses ----------------------
async function loadBuses() {
  const res = await fetch('http://localhost:3000/api/buses', {
    headers: { Authorization: `Bearer ${token}` }
  });
  buses = await res.json();
  renderBuses();
}

function renderBuses() {
  const list = document.getElementById('busList');
  list.innerHTML = buses.map(bus => `
    <li>
      ${bus.name} - ${bus.date.split('T')[0]} (${bus.timing}) - ${bus.pickupPoints.join(', ')} → ${bus.examCenter} ₹${bus.price}
      <button onclick="editBus('${bus._id}')">✏️</button>
      <button onclick="deleteBus('${bus._id}')">❌</button>
    </li>`).join('');
}

async function addBus() {
  const name = document.getElementById('busName').value.trim();
  const seatCount = document.getElementById('seatCount').value.trim();
  const date = document.getElementById('travelDate').value;
  const timing = document.getElementById('busTiming').value;
  const examCenter = document.getElementById('examCenterSelect').value;
  const price = document.getElementById('price').value.trim();

  const pickupPoints = Array.from(document.querySelectorAll('#pickupCheckboxes input:checked')).map(cb => cb.value);

  if (!name || !seatCount || !date || !timing || !examCenter || pickupPoints.length === 0 || !price) {
    return alert("Please fill all bus fields.");
  }

  try {
    const res = await fetch('http://localhost:3000/api/buses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        totalSeats: seatCount,
        date,
        timing,
        pickupPoints,
        examCenter,
        price
      })
    });

    if (!res.ok) throw new Error('Failed to add bus');
    await loadBuses();
    document.getElementById('busName').value = '';
    document.getElementById('seatCount').value = '';
    document.getElementById('travelDate').value = '';
    document.getElementById('busTiming').value = '';
    document.getElementById('examCenterSelect').value = '';
    document.getElementById('price').value = '';
    document.querySelectorAll('#pickupCheckboxes input:checked').forEach(cb => cb.checked = false);
  } catch (err) {
    alert(err.message);
  }
}

function editBus(id) {
  const bus = buses.find(b => b._id === id);
  if (!bus) return;
  document.getElementById('busName').value = bus.name;
  document.getElementById('seatCount').value = bus.totalSeats;
  document.getElementById('travelDate').value = bus.date.split('T')[0];
  document.getElementById('busTiming').value = bus.timing;
  document.getElementById('examCenterSelect').value = bus.examCenter;
  document.getElementById('price').value = bus.price;
  document.querySelectorAll('#pickupCheckboxes input').forEach(cb => {
    cb.checked = bus.pickupPoints.includes(cb.value);
  });

  editingBusId = id;
  document.getElementById('updateBusBtn').style.display = 'inline-block';
}

async function updateBus() {
  if (!editingBusId) return alert('No bus selected');
  const name = document.getElementById('busName').value.trim();
  const seatCount = document.getElementById('seatCount').value.trim();
  const date = document.getElementById('travelDate').value;
  const timing = document.getElementById('busTiming').value;
  const examCenter = document.getElementById('examCenterSelect').value;
  const price = document.getElementById('price').value.trim();
  const pickupPoints = Array.from(document.querySelectorAll('#pickupCheckboxes input:checked')).map(cb => cb.value);

  if (!name || !seatCount || !date || !timing || !examCenter || pickupPoints.length === 0 || !price) {
    return alert("Please fill all fields");
  }

  try {
    const res = await fetch(`http://localhost:3000/api/buses/${editingBusId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        totalSeats: seatCount,
        date,
        timing,
        pickupPoints,
        examCenter,
        price
      })
    });

    if (!res.ok) throw new Error('Failed to update bus');
    editingBusId = null;
    document.getElementById('updateBusBtn').style.display = 'none';
    await loadBuses();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteBus(id) {
  if (!confirm('Delete this bus?')) return;
  try {
    const res = await fetch(`http://localhost:3000/api/buses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete bus');
    await loadBuses();
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Students ----------------------
async function loadStudents() {
  try {
    const res = await fetch('http://localhost:3000/api/students', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load students');
    students = await res.json();
    renderStudents();
  } catch (err) {
    alert(err.message);
  }
}

function renderStudents() {
  const list = document.getElementById('studentsList');
  if (!list) return;
  if (students.length === 0) {
    list.innerHTML = '<li>No students registered yet.</li>';
  } else {
    list.innerHTML = students.map(s => `
      <li>
        <strong>${s.name}</strong><br>
        Roll: ${s.university}<br>
        Email: ${s.email}<br>
        Mobile: ${s.mobile}<br>
        Parent: ${s.parentmobile}
      </li>`).join('');
  }
}

// ---------------------- Bookings ----------------------
async function loadBookings() {
  try {
    const res = await fetch('http://localhost:3000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load bookings');
    bookings = await res.json();
    renderBookings();
  } catch (err) {
    alert(err.message);
  }
}

function renderBookings() {
  const list = document.getElementById('bookingsList');
  if (!list) return;
  if (bookings.length === 0) {
    list.innerHTML = '<li>No bookings found.</li>';
  } else {
    list.innerHTML = bookings.map(b => {
      const studentName = b.studentId?.name || 'Unknown Student';
      const studentEmail = b.studentId?.email || '';
      const studentMobile = b.studentId?.mobile || '';
      const busName = b.busId?.name || 'Unknown Bus';
      const date = b.date?.split('T')[0] || 'N/A';
      const pickup = b.pickupPoint || '';
      const center = b.examCenter || '';
      const price = b.price || '';
      const time = b.time || '';
      const bookingId = b._id;

      return `
        <li>
          <strong>${studentName}</strong> - ${studentEmail} (${studentMobile})<br>
          Booked <strong>${busName}</strong> on ${date}<br>
          Pickup: ${pickup}, Center: ${center}, Time: ${time}, ₹${price}
          <br>
          <button onclick="cancelBookingAsAdmin('${bookingId}')">❌ Cancel</button>
        </li>`;
    }).join('');
  }
}

async function cancelBookingAsAdmin(bookingId) {
  try {
    const res = await fetch(`/admin/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Booking cancelled successfully");
      await loadBookings();
    } else {
      alert(`❌ ${data.message || "Error cancelling booking"}`);
    }
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Downloads ----------------------
function downloadStudents() {
  fetch('http://localhost:3000/admin/export/students', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

function downloadBookings() {
  fetch('http://localhost:3000/admin/export/bookings', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}
