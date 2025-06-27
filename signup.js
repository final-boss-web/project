document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();  // ✅ New field
  const mobile = document.getElementById('mobile').value.trim();
  const parentmobile = document.getElementById('parentmobile').value.trim();
  const university = document.getElementById('university').value.trim();

  // ✅ Check if password is provided
  if (!password) {
    alert("Password is required!");
    return;
  }

  const studentData = {
    name,
    email,
    password,
    mobile,
    parentmobile,
    university
  };

  try {
    const res = await fetch('http://localhost:3000/student/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Signup failed');
      return;
    }

    const data = await res.json();
    localStorage.setItem('studentToken', data.token);
    alert('Signup successful!');
    window.location.href = 'booking.html'; // ✅ redirect to booking
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again.');
  }
});
