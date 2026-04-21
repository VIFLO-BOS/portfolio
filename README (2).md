# Bankole Olaniyi Sunday | Professional Portfolio

![Portfolio Preview](./images/af.png)

A modern, highly responsive, and interactive personal portfolio demonstrating expertise in Full-Stack Development, Mobile Application Development, and AI Training Infrastructure. Built without heavy JS frameworks, leveraging raw DOM manipulation, compiled TypeScript, and Tailwind CSS for a highly performant static build.

---

## 🚀 Live Demo

*You can link your deployed project here (e.g., Vercel, GitHub Pages, Netlify).*

---

## 🛠️ Technology Stack

This project takes a "lean and fast" approach to modern web architecture, utilizing core web technologies combined with powerful utility libraries.

### Core Architecture
- **HTML5**: Semantically structured for accessibility and SEO optimization.
- **Tailwind CSS (via CDN)**: Custom configured (`tailwind.config.js`) for a consistent dark-theme UI featuring emerald, cyan, and deep purple gradient accents.
- **TypeScript**: Strictly typed DOM interactions and scroll behavior (`script.ts`), compiled down to optimized ES6 JavaScript.

### Key Libraries & Integrations
- **Lucide Icons**: Clean, consistent, and lightweight SVG iconography.
- **Web3Forms**: Serverless backend implementation for the Contact Form, instantly delivering messages to a designated email.
- **Intersection Observer API**: Native implementation for smooth reveal animations on scroll without third-party animation libraries.

---

## 📂 Project Structure

```text
├── index.html            # Main markup file (SEO & Semantic Structure)
├── style.css             # Base CSS and custom scrollbar definitions
├── script.ts             # Source Logic: Navigation, Animations, Form Handling
├── script.js             # Compiled JavaScript output
├── tailwind.config.js    # Custom Tailwind theme, keyframes, and animations
├── tsconfig.json         # TypeScript compiler configuration targeting ES2022
├── lucide-script.js      # Local fallback script for icons
└── images/               # Media directory
    └── af.png            # Main hero portrait
```

---

## 🎨 Design & Features

1. **Dark Mode First**: Carefully crafted `slate-950` backgrounds with glowing `primary` and `accent` gradient masks to establish a modern, developer-centric aesthetic.
2. **Dynamic UI/UX**:
   - Progressive glassmorphism effect on the fixed navigation bar during scroll.
   - Intelligent mobile menu with smooth toggling logic.
   - Smooth staggered "reveal" transitions powered by the Intersection Observer.
   - Form-field validation and error-handling baked directly into the form states.
3. **Optimized Imagery**: Hero images utilize custom CSS gradient-masking techniques (`mask-image: radial-gradient(...)`) to seamlessly blend standard images into the surrounding dark canvas.

---

## 💻 Local Development

Running this project locally is extremely simple since it is a pure static-site build.

### Prerequisites
- [Node.js](https://nodejs.org/) (Only needed if you wish to re-compile the TypeScript)
- A basic Local Web Server (e.g., VS Code *Live Server* extension, or Python's `http.server`)

### Steps to Run
1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd Portfolio
   ```
3. Boot up your local server. For example, using Python:
   ```bash
   python -m http.server 8000
   ```
4. Access the web app in your browser at `http://localhost:8000`.

### Compiling TypeScript
If you make changes to the logic located in `script.ts`, you will need to recompile the file into `script.js`.
Ensure you are in the root directory and run:
```bash
npx tsc
```

---

## 📫 Contact Integrations

The contact form is successfully integrated with **Web3Forms**. 
To update the email endpoint:
1. Open `index.html`.
2. Locate the Contact Form section.
3. Update the hidden `access_key` input with your personal Web3Forms key.

---

## 📄 License & Copyright

© 2026 Bankole Olaniyi Sunday. All rights reserved. 
