# 🌍 Desertification Project - Frontend

It provides the user interface for features such as authentication, profile management, prediction visualization, and interactive map handling.

---

## 🚀 Tech Stack

- **Framework**: [React + Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **UI**: Tailwind CSS + custom components
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Validation**: Zod
- **Maps**: React Leaflet

---

## 📂 Project Structure

```bash
    frontend/
    │── public/          # Static assets
    │── src/
    │ ├── ui/            # Shared reusable components
    │ ├── hooks/         # Custom hooks (e.g., auth, user data)
    │ ├── context/       # Main Contexts (e.g., AuthContext, UserContext)
    │ ├── pages/         # Main app pages (Login, Profile, EditProfile, etc.)
    │ ├── schema/        # Zod schemas & types
    │ ├── services/      # API services (Axios calls)
    │ ├── App.tsx        # Main app component
    │ ├── main.tsx       # Entry point
    │── package.json
    │── tsconfig.json
    │── hero.ts
    │── vite.config.ts
```
---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
    git clone https://github.com/FarahAkl/Digitopia-Project.git
    cd Frontend
```

2. Install dependencies

```bash
    npm install
```

3. Run the development server

```bash 
    npm run dev
```
---

## 🔑 Features

- 🔐 Authentication – Login / Forget password

- 👤 Profile – View & update user profile (name, email, phone, location, image)

- 🌍 Map – Interactive map with markers & location circle

- 📊 Prediction – NDVI & desertification prediction with recommendations

- 🎨 UI – Responsive design with Tailwind CSS

---

## 🚀 Live Demo

👉 [Click here to view the live demo](https://digitopia-project-seven.vercel.app/)  

