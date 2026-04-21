document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop default form submit

    // you can add validation or backend call here

    // redirect to dashboard page
    window.location.href = "adminHomePage.html";
});