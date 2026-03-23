# Tanvi Dubey - Portfolio

A personal portfolio site built with Next.js, featuring a full stack developer profile, project showcase, contact form, and light/dark theme.

**Live demo:** [https://tanvvi-dubey.vercel.app/](https://tanvvi-dubey.vercel.app/)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Theme:** Light/dark mode via `next-themes`

## Features

- **Sections:** Hero, About, Skills, Experience, Projects, Education, Contact
- **Dual theme:** Toggle between light and dark mode (respects system preference)
- **Contact form:** Name, email, message with API route at `/api/contact`
- **Responsive:** Layout and navigation adapted for mobile, tablet, and desktop
- **Accessibility:** Focus states, semantic HTML, ARIA where needed

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm (or yarn / pnpm)

### Install and run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/    # POST handler for contact form
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx       # Main single-page content
│   └── components/
│       ├── ContactForm.tsx
│       ├── Nav.tsx        # Header + mobile menu + theme toggle
│       ├── ThemeProvider.tsx
│       └── ThemeToggle.tsx
├── public/
├── package.json
└── README.md
```

## Contact Form

The contact form submits to `POST /api/contact` with JSON body: `{ name, email, message }`. The API route validates input and returns success. To send real emails, integrate an email service (e.g. Resend, SendGrid) or Formspree in `src/app/api/contact/route.ts`.

## License

Private - Tanvi Dubey © 2025
