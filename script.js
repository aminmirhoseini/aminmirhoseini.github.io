// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      // Update active link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Update active link on scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Show/hide back to top button
  const backToTopButton = document.getElementById("back-to-top");
  if (scrollPosition > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

// Back to top button
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillsSection = document.getElementById("skills");
  const skillsSectionTop = skillsSection.offsetTop;
  const windowHeight = window.innerHeight;

  if (window.scrollY > skillsSectionTop - windowHeight + 200) {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });

    // Remove event listener after animation
    window.removeEventListener("scroll", animateSkillBars);
  }
};

window.addEventListener("scroll", animateSkillBars);

// Make response contact form

const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  try {
    const res = await fetch(
      "https://delicate-dew-cea1.mirhoseini-amin1374.workers.dev/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      const html = await res.text();
      document.body.innerHTML = html;
    } else {
      const text = await res.text();
      statusDiv.innerHTML = `<span class="text-danger">Error: ${text}</span>`;
    }
  } catch (err) {
    statusDiv.innerHTML = `<span class="text-danger">Network error: ${err.message}</span>`;
  }
});

// copy phone number
function copyText() {
  const textToCopy = "Sorry, Can't be public, Please Use The Contact Form";
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const msg = document.getElementById("copyMessage");
      msg.style.opacity = "1";
      setTimeout(() => {
        msg.style.opacity = "0";
      }, 1500);
    })
    .catch((err) => console.error("Copy failed:", err));
}

// word sliding
let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letter = word.textContent.split("");
  word.textContent = "";
  letter.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
changeText();
setInterval(changeText, 3000);

// Roting text behind pic
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML
  .split("")
  .map((char, i) => `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`)
  .join("");
