# Copilot instructions for BibliotecaFront

This repository is the front‑end of the **Proyecto Biblioteca**. It is a
simple Vite‑powered React + TypeScript application that has been
bootstrapped from the official `vite` template and later augmented with
MUI, Zustand, axios, react‑hook‑form, zod, notistack, and react‑router.
The backend is not part of this workspace; network calls are made with
`axios` and will target whatever API the developers configure.

Below are the key points an AI coding agent needs to understand in order
to be productive quickly.

---

## 🧱 Architecture & Big picture

1. **Entry point** is `src/main.tsx`.  It renders a tree of providers
   around the `<App />` component:
   * `BrowserRouter` from `react-router-dom` for client routing.
   * `ThemeProvider` + `CssBaseline` using the custom theme in
     `src/theme.ts` (dark mode, custom colours, border radius, …).
   * `SnackbarProvider` from `notistack` for toast messages.
   * The app is wrapped in `React.StrictMode`.

2. **Routing** is defined inside `src/App.tsx`.  Currently it just
   redirects everything to `/login`.  Add additional `<Route>`s there
   (or split into a separate `Routes` component) as the app grows.

3. **State**: zustand is included as a dependency, but there are no
   stores yet.  When adding global state, place store files under
   `src/` and export hooks (`useSessionStore`, `usePreferencesStore`,
   etc.).  Prefer the `create` factory pattern from the docs.

4. **Network**: use `axios` clients.  The project has no configured
   interceptors yet; if you add them, create a dedicated file like
   `src/api/client.ts` and import it where needed.  All async API
   interactions should return typed interfaces/`zod` schemas for
   validation.

5. **Forms & validation**: react‑hook‑form + zod are available.  Use
   `zodResolver` from `@hookform/resolvers/zod` for schema-driven form
   validation.

6. **UI**: Material‑UI (MUI) is the components library.  Look at
   `src/theme.ts` for the customized theme.  Use the `<Button>`,
   `<TextField>`, etc., and ensure components respect the theme.

7. **Assets**: images and icons belong in `src/assets`.  Import them as
   modules (e.g. `import logo from './assets/logo.svg'`).

8. **TypeScript**: strict mode is enabled (`tsconfig.*.json`).  New code
   must compile without `any` and adhere to lint rules.  Components are
   `.tsx`; plain helpers are `.ts`.


## 🚀 Developer workflows

* **Start dev server:** `npm install` (once) then `npm run dev`.  Vite
  runs on `localhost:5173` by default.
* **Build for production:** `npm run build` (runs `tsc -b && vite
  build`).
* **Preview build:** `npm run preview` after building.
* **Lint:** `npm run lint`.  The configuration lives in
  `eslint.config.js`; it already includes React hooks and refresh
  plugins.  Type‑aware rules are not enabled by default – enable them
  as shown in the README if you make the project production‑grade.
* **Type‑checking:** part of `build`.  Run `npx tsc --noEmit` to just
  check types.
* **No tests** exist currently; add jest/RTL or Vitest if needed.

> ⚠️ This repo is intentionally minimal.  Many common tasks (tests,
> storybook, CI) are not set up yet and will need to be added manually.


## ✅ Conventions & patterns

* **File placement:** all source code under `src/`.  There’s no
  prescribed sub‑directory structure yet; however, components,
  hooks, stores, and pages are typical groupings.  Keep barrel files
  (`index.ts`) where it helps.
* **Components:** use functional components with hooks.  Name files
  with PascalCase (`MyComponent.tsx`).
* **Styling:** rely on MUI’s `sx` prop or styled components from
  `@emotion/styled`.  Avoid global CSS except for reset/utility styles in
  `src/index.css`/`App.css`.
* **Routing:** prefer nested `<Routes>` and route objects when the tree
  grows.  If authentication is required, create a `ProtectedRoute`
  component wrapping `Navigate` or `Outlet`.
* **Error handling:** return rejected promises; catch in components or
  a central error boundary if added.  To show snackbars use
  `useSnackbar()` from notistack.
* **Date handling:** use `dayjs` (already installed).
* **State updates:** prefer immer-like immutable updates or the mutable
  syntax of zustand stores (they’re allowed).
* **Strings:** The project currently has no i18n; hardcode or add a
  translation layer if you introduce one.


## 🔗 External integrations

* **Backend API:** accessed via `axios`.  Host/URL are not defined; use
  environment variables (`import.meta.env.VITE_API_URL`).  Add a
  `.env` file if needed – Vite uses the `VITE_` prefix.
* **Authentication:** not implemented.  Typical flow would be a
  `/login` page that sets a token in a zustand store and adds it to
  axios headers.
* **Notifications:** use `notistack`.  The provider is already mounted
  in `main.tsx` with a 3‑snack limit and bottom‑right anchor.


## 📝 Editing this file

Because there is currently no `.github/copilot-instructions.md`, this
file dictates the behaviour of any Copilot/AI agents working here.  Keep
it concise (20–50 lines); avoid generic guidance like “write tests” or
“handle errors” unless the repository has a pattern for that.  Update
this document whenever new conventions, scripts or significant
architecture changes are introduced.

---

Please review the sections above and let me know if anything is unclear
or if there are other project‑specific details I should add.