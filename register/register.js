// ================== DOM LOAD ==================
document.addEventListener("DOMContentLoaded", () => {

  // ================== REGISTER FORM ==================
  const form = document.getElementById("registerForm");

  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // 🔹 Basic validation
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (!email.includes("@")) {
        alert("Enter a valid email");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        // 🔥 Duplicate user
        if (!data.success) {
          alert("Account already exists. Redirecting to login...");

          setTimeout(() => {
            window.location.href = "../login/login.html";
          }, 1500);

          return;
        }

        // ✅ Success
        alert("Registration successful!");
        window.location.href = "../childrenDetailForm/registerDetailForm.html";

      } catch (error) {
        console.error("Full Error:", error);
        alert("Something went wrong ❌");
      }
    });
  }


  // ================== SLIDER ==================
  let index = 0;
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  if (!slides || totalSlides === 0) return;

  let interval;

  function startSlider() {
    interval = setInterval(() => {
      index = (index + 1) % totalSlides;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }, 3500);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  // Pause on hover (better UX)
  slides.addEventListener("mouseenter", stopSlider);
  slides.addEventListener("mouseleave", startSlider);

  // Start slider
  startSlider();

});