# Jeremy Ebardo — Portfolio

A modern, dark-themed personal portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## ⚙️ Configuration

### 1. Set Your GitHub Username

Open `src/data/index.js` and update:

```js
export const GITHUB_USERNAME = 'your-actual-github-username'
```

This enables the **GitHub API integration** that fetches your real repos.

### 2. Update Your Profile Info

In `src/data/index.js`, update the `profile` object with any changes (email, location, links).

### 3. Connect the Contact Form

The contact form simulates a send by default. To make it real, pick one:

**Option A – Formspree (easiest, free):**
1. Go to [formspree.io](https://formspree.io) and create a form
2. In `Contact.jsx`, replace the `handleSubmit` body:
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (!res.ok) throw new Error('Failed')
```

**Option B – EmailJS (client-side):**
```bash
npm install @emailjs/browser
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── sections/          # Page sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   └── ui/                # Reusable components
│       ├── SectionHeading.jsx
│       ├── GlitchText.jsx
│       └── ProjectModal.jsx
├── hooks/                 # Custom React hooks
│   ├── useTheme.js        # Dark/light mode toggle
│   ├── useGitHub.js       # GitHub API fetcher
│   └── useScrollSpy.js    # Active nav highlighting
├── data/
│   └── index.js           # All portfolio content (edit here!)
├── utils/
│   └── motion.js          # Framer Motion variants
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚢 Deployment

### Vercel (Recommended — 1 minute)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts — framework will be auto-detected as Vite
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys on push.

### GitHub Pages

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# 3. Set base in vite.config.js:
# base: '/your-repo-name/'

# 4. Deploy
npm run deploy
```

---

## 🎨 Customization

| What | Where |
|------|-------|
| Colors / fonts | `tailwind.config.js` |
| Global styles | `src/index.css` |
| All content | `src/data/index.js` |
| Animation timing | `src/utils/motion.js` |
| Section layouts | `src/components/sections/*.jsx` |

---

## 📦 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — animations
- **Lucide React** — icons
- **GitHub REST API** — live repo fetching

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
