// Define lucide as any to avoid TypeScript errors since it's loaded via CDN
declare var lucide: any;
// Initialize and render all Lucide icons correctly loaded on the page
lucide.createIcons();






// *******
// CURRENT YEAR LOGIC
// *******
// Get the current year
const currentYear = new Date().getFullYear();

// Get the current year element
const currentYearElement = document.getElementById("current-year") as HTMLSpanElement;

// Set the current year
if (currentYearElement) {
  currentYearElement.textContent = currentYear.toString();
}

// *******
// MOBILE NAVIGATION MENU LOGIC
// *******
// Get the mobile hamburger button and the mobile menu container
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  // Toggle the visibility of the mobile menu when the hamburger button is clicked
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Automatically close the mobile menu whenever any navigation link inside it is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// *******
// NAVBAR SCROLL EFFECTS LOGIC
// *******
// Get the main navigation bar
const navbar = document.getElementById("navbar");
let lastScroll = 0; // Track the last scroll position

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // If we've scrolled down more than 100 pixels, add a solid background and shadow to the navbar
    if (currentScroll > 100) {
      navbar.classList.add("shadow-lg");
      navbar.classList.add("bg-slate-950/95");
    } else {
      // Otherwise, keep it completely transparent without shadow when near the top
      navbar.classList.remove("shadow-lg");
      navbar.classList.remove("bg-slate-950/95");
    }

    lastScroll = currentScroll;
  });
}

// *******
// SCROLL REVEAL ANIMATIONS LOGIC
// *******
// Select all elements that have the '.reveal' class for scroll animations
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight; // The viewport's height
  const elementVisible = 100; // Trigger threshold in pixels

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    
    // If the top of the element is inside the viewport (minus the threshold margin), add 'active' class
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

// Check for reveal animations whenever the user scrolls
window.addEventListener("scroll", revealOnScroll);
// Run once manually on page load to reveal any elements that are already immediately in view
revealOnScroll();

// *******
// SMOOTH SCROLLING FOR ANCHOR LINKS LOGIC
// *******
// Find all anchor tags that link to an ID on the same page (e.g., href="#about")
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (this: HTMLAnchorElement, e: Event) {
    e.preventDefault(); // Stop the default instant jump-to-anchor HTML behavior
    
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      const target = document.querySelector(href);
      if (target) {
        // Smoothly glide/scroll to the target element's position on the page
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// *******
// BACK TO TOP BUTTON LOGIC
// *******
// Target the back to top floating button
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    // Show the "Back to Top" button only when the user has scrolled down > 500 pixels
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
    } else {
      // Hide the button when near the top of the page
      backToTopBtn.classList.add("opacity-0", "pointer-events-none");
    }
  });

  // When the back to top button is clicked, smoothly scroll back to the absolute top of the page
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// *******
// WEB3FORMS CONTACT FORM LOGIC
// *******
// Get the contact form element and cast it as an HTMLFormElement for TypeScript compliance
const contactForm = document.getElementById('contact-form') as HTMLFormElement;

// Protect against null runtime errors by wrapping with an IF check
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop the normal browser-based HTML form submission process

    // Get the submit button so we can manipulate its text/state
    const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!submitBtn) return;

    // Save the original button text/HTML so we can restore it after success/failure
    const originalText = submitBtn.innerHTML;

    // Temporarily show a loading spinner and 'Sending...' state
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
    // Disable the button to prevent the user from clicking multiple times and sending double submissions
    submitBtn.disabled = true; 

    // Automatically collect all input values/names currently inside the form
    const formData = new FormData(contactForm);

    // Convert the form data collected into a plain JSON object string for the API format
    const data = Object.fromEntries(formData);
    const json = JSON.stringify(data);

    try {
      // Send a POST HTTP fetch request to the Web3Forms API endpoint asynchronously
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      // Wait out and parse the JSON response returned from Web3Forms
      const result = await response.json();

      if (result.success) {
        // *******
        // SUCCESS BLOCK
        // *******
        // If the submission worked, show a visually distinct checkmark confirmation
        submitBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Message Sent!';
        submitBtn.classList.remove('from-primary-600', 'to-accent-600'); // Remove default gradient
        submitBtn.classList.add('bg-green-600'); // Turn the button entirely green
        
        // Clear all user inputs/data from the form fields
        contactForm.reset(); 

        // Reset the button back to its exact original state after 3 seconds have passed
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.add('from-primary-600', 'to-accent-600'); // Reapply gradient
          submitBtn.classList.remove('bg-green-600'); // Remove green styling
          lucide.createIcons(); // Re-render the original Lucide send-icon
        }, 3000);
      } else {
        // If web3forms says success is false in formatting, manually throw an error to jump straight to the catch block below
        throw new Error('Submission failed');
      }
    } catch (error) {
      // *******
      // ERROR BLOCK
      // *******
      // If the fetch fails to connect or success is false, show a red X failure response
      submitBtn.innerHTML = '<i data-lucide="x" class="w-5 h-5"></i> Failed. Try again.';
      submitBtn.classList.add('bg-red-600'); // Turn the button fully red

      // Reset the button back to its exact original state after 3 seconds so they can attempt to try again
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-red-600'); // Remove red styling
        lucide.createIcons(); // Re-render the original Lucide send-icon
      }, 3000);
    }
  });
}
