document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

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

        // 🔥 Handle duplicate user
        if (!data.success) {
            alert("Account already exists. Redirecting to login...");

            setTimeout(() => {
                window.location.href = "../login/login.html";
            }, 1500);

            return;
        }

        // ✅ Successful registration
        alert("Registration successful!");
        window.location.href = "../childrenDetailForm/registerDetailForm.html";

    } catch (error) {
        console.error("Full Error:", error);
        alert("Something went wrong ❌");
    }
});