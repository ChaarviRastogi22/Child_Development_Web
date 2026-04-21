// Wait till DOM loads
document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       1. GENERATE CHILD FORMS
    =============================== */

    window.generateForms = function () {
        const count = document.getElementById("childCount").value;
        const form = document.getElementById("childrenForm");

        form.innerHTML = "";

        for (let i = 1; i <= count; i++) {

            form.innerHTML += `
            
            <div class="form-section">
            <h3> Child ${i}</h3>

            <div class="input-group">
                <label>Full Name</label>
                <input type="text" name="child${i}_name" required>
            </div>

            <div class="input-group">
                <label>Gender</label><br>

                <label class="option">
                    <input type="radio" name="child${i}_gender" value="Male" required>
                    <span>Male</span>
                </label>

                <label class="option">
                    <input type="radio" name="child${i}_gender" value="Female">
                    <span>Female</span>
                </label>

                <label>
                    <input type="radio" name="child${i}_gender" value="Other" class="other-radio">
                    Other
                    <input type="text" name="child${i}_gender_other" class="other-text" disabled>
                </label>
            </div>

            <div class="input-group">
                <label>Relation</label><br>

                <label class="option">
                    <input type="radio" name="child${i}_relation" value="Mother" required>
                    <span>Mother</span>
                </label>

                <label class="option">
                    <input type="radio" name="child${i}_relation" value="Father">
                    <span>Father</span>
                </label>

                <label>
                    <input type="radio" name="child${i}_relation" value="Other" class="other-radio">
                    Other
                    <input type="text" name="child${i}_relation_other" class="other-text" disabled>
                </label>
            </div>

            <div class="input-group">
                <label>Devices Used (Select multiple)</label><br>

                <label><input type="checkbox" name="child${i}_devices" value="Mobile"> Mobile</label>
                <label><input type="checkbox" name="child${i}_devices" value="TV"> TV</label>
                <label><input type="checkbox" name="child${i}_devices" value="Tablet"> Tablet</label>

                <label>
                    <input type="checkbox" class="other-checkbox">
                    Other
                    <input type="text" name="child${i}_devices_other" class="other-text" disabled>
                </label>
            </div>

            </div>
            `;
        }

        if (count > 0) {
            form.innerHTML += `<button type="submit" class="login-btn">Submit</button>`;
        }
    };


    /* ===============================
       2. HANDLE "OTHER" INPUTS
    =============================== */

    document.addEventListener("change", function (e) {

        // RADIO "OTHER"
        if (e.target.classList.contains("other-radio")) {
            const label = e.target.closest("label");
            const text = label.querySelector(".other-text");

            if (e.target.checked) {
                text.disabled = false;
                text.focus();
            }
        }

        // RESET OTHER TEXT WHEN NORMAL RADIO SELECTED
        if (e.target.type === "radio" && !e.target.classList.contains("other-radio")) {
            const groupName = e.target.name;

            document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                const label = r.closest("label");
                if (!label) return;

                const text = label.querySelector(".other-text");
                if (text) {
                    text.disabled = true;
                    text.value = "";
                }
            });
        }

        // CHECKBOX "OTHER"
        if (e.target.classList.contains("other-checkbox")) {
            const label = e.target.closest("label");
            const text = label.querySelector(".other-text");

            if (e.target.checked) {
                text.disabled = false;
                text.focus();
            } else {
                text.disabled = true;
                text.value = "";
            }
        }
    });


    /* ===============================
       3. SCROLL-BASED TEXT CHANGE
    =============================== */

    const rightPanel = document.querySelector(".right-panel");
    const text = document.getElementById("motivationalText");

    let changed = false;

    if (rightPanel && text) {
        rightPanel.addEventListener("scroll", () => {
            if (changed) return;

            const scrollTop = rightPanel.scrollTop;
            const scrollHeight = rightPanel.scrollHeight - rightPanel.clientHeight;

            if (scrollHeight <= 0) return;

            const percent = (scrollTop / scrollHeight) * 100;

            if (percent > 50) {
                changed = true;
                text.innerText = "Just a little bit more and you will be nearer to your child's developmental goal 💙";
            }
        });
    }


    /* ===============================
       4. MULTI-STEP FORM
    =============================== */

    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const progress = document.getElementById("progress");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");
    const form = document.getElementById("multiForm");

    if (steps.length > 0) {

        function showStep(n) {
            steps.forEach(step => step.classList.remove("active"));
            steps[n].classList.add("active");

            if (progress) {
                progress.style.width = ((n + 1) / steps.length) * 100 + "%";
            }

            // Prev button
            if (prevBtn) {
                prevBtn.style.display = n === 0 ? "none" : "inline-block";
            }

            // Next / Submit toggle
            if (n === steps.length - 1) {
                if (nextBtn) nextBtn.style.display = "none";
                if (submitBtn) submitBtn.style.display = "inline-block";
            } else {
                if (nextBtn) nextBtn.style.display = "inline-block";
                if (submitBtn) submitBtn.style.display = "none";
            }
        }

        showStep(currentStep);

        if (nextBtn) {
            nextBtn.onclick = function () {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            };
        }

        if (prevBtn) {
            prevBtn.onclick = function () {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            };
        }

        // Submit + Redirect
        if (form) {
            form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            let data = {};

            formData.forEach((value, key) => {
                // handle multiple checkbox values
                if (data[key]) {
                    if (!Array.isArray(data[key])) {
                        data[key] = [data[key]];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });

            console.log(data); // debug

            // send to backend
            await fetch("http://localhost:5000/api/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // redirect after save
            window.location.href = "../dashboard/customDashboard.html";
        });
        }
    }

});