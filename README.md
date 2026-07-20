# BGC

BGC — a public directory of local board game groups.

This platform allows board game enthusiasts to discover, submit, claim, and organize local board game groups and events in their area. It features an interactive map directory, group submission and claims processes, user authentication, and multi-language support.

---

## 🛠️ Tech Stack

BGC is built as a highly responsive client-side Single-Page Application (SPA) using a modern web development stack:

- **Frontend Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/) (using programmatic client-side routing)
- **State Management:** 
  - **Zustand** (custom store for internationalization / i18n support)
  - **React Context** (handles user authentication state, group catalog state, and report submissions)
- **Backend & Database:** [Supabase](https://supabase.com/) (handles PostgreSQL database interactions and user authentication)
- **Styling & UI:**
  - [Tailwind CSS v4](https://tailwindcss.com/) (integrated via `@tailwindcss/vite` plugin)
  - [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI primitives)
  - [Material UI (MUI)](https://mui.com/) (for supplementary icons and styling)
  - [Motion](https://motion.dev/) (for rich interactive micro-animations)
- **Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/) (for interactive map and geo-directory display)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Geocoding:** Integration with [Zippopotam.us](http://www.zippopotam.us/) for ZIP code lookup and coordination resolution

---

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed on your machine:

- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager) or **Bun** runtime

---

## ⚙️ Environment & Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd bgc-v20
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory (a committed `.env` is available as a reference, but make sure to supply your own keys for production/custom deployments):
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_USE_MOCK=false
   ```
   *Note: Set `VITE_USE_MOCK=true` if you wish to run the frontend entirely in mock mode using client-side fallback data located in `src/data/` without connecting to Supabase.*

---

## 🚀 Running Locally

You can run BGC locally using either **npm** or **Bun**.

### Using npm

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Open the App:**
   Navigate to the local server URL printed in your terminal (typically `http://localhost:5173`).

### Using Bun

1. **Install Dependencies:**
   ```bash
   bun install
   ```

2. **Start the Development Server:**
   ```bash
   bun run dev
   ```

---

## 📦 Building for Production

To generate a static build optimized for production hosting:

```bash
npm run build
# or
bun run build
```

This compiles the project into the `dist/` directory, which can be deployed directly to static hosting platforms such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Note that since this is an SPA, you must configure your host to rewrite all routes to `index.html`.