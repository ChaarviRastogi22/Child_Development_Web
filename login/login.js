document.addEventListener("DOMContentLoaded", () => {
  
  // Guest button nav
  const guestBtn = document.querySelector(".guest-btn");
  guestBtn.addEventListener("click", () => {
    //Optional: Mark user as guest
    localStorage.setItem("userType", "guest");
    
    //Redirect to homepage
    window.location.href = "../homePage/homePage.html";
  });

  
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful ✅");
        window.location.href = "../homePage/homePage.html";
      } else {
        alert("Invalid email or password ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ⚠️");
    }
  });
});