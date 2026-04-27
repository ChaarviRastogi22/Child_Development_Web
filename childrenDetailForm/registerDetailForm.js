const form = document.getElementById("multiForm");

const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");

let currentStep = 0;

// ================= SKIP BUTTON =================
skipBtn.addEventListener("click", () => {
  const confirmSkip = confirm(
    "If you skip, you won't get personalized recommendations. Continue?"
  );

  if (confirmSkip) {
    window.location.href = "../homePage/homePage.html";
  }
});

// ================= SHOW STEP =================
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.remove("active");
    if (i === index) step.classList.add("active");
  });

  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.style.display = index === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = index === steps.length - 1 ? "inline-block" : "none";
}

// ================= STEP VALIDATION =================
function validateStep() {
  const currentInputs = steps[currentStep].querySelectorAll("input");

  let valid = true;

  // check radios
  const radioGroups = {};
  currentInputs.forEach(input => {
    if (input.type === "radio") {
      radioGroups[input.name] = true;
    }
  });

  for (let name in radioGroups) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    if (!checked) {
      valid = false;
    }
  }

  if (!valid) {
    alert("Please select required options ⚠️");
  }

  return valid;
}

// ================= NEXT =================
nextBtn.addEventListener("click", () => {
  if (!validateStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

// ================= PREVIOUS =================
prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

// ================= SUBMIT =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // final validation (example)
  const age = document.querySelector('input[name="age"]:checked');
  if (!age) {
    alert("Please complete the form properly ⚠️");
    return;
  }

  const formData = new FormData(form);
  let data = {};

  formData.forEach((value, key) => {
    if (key.includes("[]")) {
      const cleanKey = key.replace("[]", "");
      if (!data[cleanKey]) data[cleanKey] = [];
      data[cleanKey].push(value);
    } else {
      data[key] = value;
    }
  });

  // attach userId (if exists)
  const userId = localStorage.getItem("userId");
  if (userId) {
    data.userId = userId;
  }

  console.log("Sending data:", data);

  try {
    const res = await fetch("http://localhost:5000/api/child/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message || "Form submitted successfully ✅");

      // optional redirect
      // window.location.href = "thankyou.html";
    } else {
      alert(result.error || "Submission failed ❌");
    }

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
});

// ================= INIT =================
showStep(currentStep);