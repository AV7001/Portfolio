'use strict';

// ================================
// ELEMENT TOGGLE
// ================================
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ================================
// SIDEBAR
// ================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// ================================
// CUSTOM SELECT
// ================================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all" || selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(value);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ================================
// CONTACT FORM
// ================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

console.log("Form elements found:", {
  form: !!form,
  formInputs: formInputs.length,
  formBtn: !!formBtn
});

// enable button when form valid
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ================================
// EMAILJS INIT
// ================================
(function () {
  console.log("Initializing EmailJS...");
  try {
    emailjs.init("5skUeGQsPUWWQVC3W");
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.error("EmailJS initialization failed:", error);
  }
})();

// send email
form.addEventListener("submit", function (e) {
  console.log("Form submit event triggered!");
  e.preventDefault();
  console.log("Default prevented, starting EmailJS send...");

  formBtn.disabled = true;
  formBtn.querySelector("span").textContent = "Sending...";

  emailjs.sendForm(
    "service_epwyg27",
    "template_l7xffoa",
    this
  )
  .then((response) => {
    console.log("EmailJS success:", response);
    alert("✅ Message sent successfully!");
    form.reset();
    formBtn.querySelector("span").textContent = "Send Message";
    formBtn.disabled = false;
  })
  .catch(error => {
    console.error("EmailJS error:", error);
    alert("❌ Failed to send message. Check console for details.");
    formBtn.querySelector("span").textContent = "Send Message";
    formBtn.disabled = false;
  });
});

// ================================
// PAGE NAVIGATION
// ================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach((page, index) => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[index].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[index].classList.remove("active");
      }
    });
  });
});

// ================================
// PROJECT LINK CONFIRM
// ================================
const projectLinks = document.querySelectorAll("[data-project-url]");

projectLinks.forEach(project => {
  project.addEventListener("click", function (e) {
    const url = this.dataset.projectUrl;
    const titleElem = this.querySelector(".project-title");
    const title = titleElem ? titleElem.innerText : "Project";

    if (url && url !== "#") {
      e.preventDefault();
      if (confirm(`Open "${title}" in a new tab?`)) {
        window.open(url, "_blank");
      }
    }
  });
});
