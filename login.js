// document.addEventListener('DOMContentLoaded', () => {
//   const loginForm = document.getElementById('loginForm');

//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value.trim();

//     if (!email || !password) {
//       alert('Please enter email and password');
//       return;
//     }

//     try {
//       const res = await fetch('/student/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("❌ Login failed:", errorData.error);
//         alert(errorData.error || "Login failed");
//         return;
//       }

//       const data = await res.json();
//       console.log("✅ Logged in:", data);

//       // Save token & status in localStorage
//       localStorage.setItem('studentToken', data.token);
//       localStorage.setItem('studentLoggedIn', true);
//       localStorage.setItem('studentName', data.student.name); // ✅ fixed here

//       // Redirect to booking page
//       window.location.href = 'booking.html';

//     } catch (err) {
//       console.error("❌ Login error:", err);
//       alert("Something went wrong. Please try again.");
//     }
//   });
// });

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  try {
    const res = await fetch('http://localhost:3000/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Login failed');
      return;
    }

    // ✅ Protect against undefined
    if (!data.student || !data.student.name) {
      alert('Invalid response from server.');
      return;
    }

    // ✅ Save token and student info
    localStorage.setItem('studentToken', data.token);
    localStorage.setItem('studentName', data.student.name);
    alert(`Welcome, ${data.student.name}!`);
    window.location.href = 'booking.html';

  } catch (error) {
    console.error('Login error:', error);
    alert('Server error. Please try again.');
  }
});
