# 🎬 Movix – Modern Movie Discovery App

Movix is a modern, Netflix-inspired movie discovery web application built with React and Firebase. It allows users to explore trending movies, search content, and manage a personalized watchlist with a smooth and cinematic user experience.

---

## 🚀 Getting Started (Setup Guide)

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movix.git
cd movix
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_TMDB_API_KEY=your_tmdb_api_key
```

---

### 4. Run the Development Server

```bash
npm run dev
```

App will be available at:

```
http://localhost:5173
```

---

## ✨ Features

### 🔐 Authentication

* Email & Password Sign Up / Login
* Google OAuth Login
* Persistent user sessions

---

### 🎬 Movie Discovery

* Trending, Popular, and Top Rated movies
* Real-time search with debounce
* Movie details with metadata (rating, genre, description)

---

### ❤️ Watchlist System

* Add / Remove movies to watchlist
* Persistent storage using Firebase Firestore
* Synced across sessions

---

### ⚡ Performance & UX

* Infinite scrolling (Discover section)
* Skeleton loading (shimmer effect)
* Smooth hover animations
* Responsive design (Mobile → Desktop)

---

### 🎨 UI / UX

* Netflix-inspired cinematic dark theme
* Clean layout with structured sections
* Modern typography and spacing system

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### State Management

* Redux Toolkit

### Data Fetching

* TanStack Query (React Query)

### Forms & Validation

* React Hook Form

### Backend & Services

* Firebase Authentication
* Firebase Firestore

### API

* TMDB (The Movie Database API)

---

## 📁 Project Structure

```
src/
  components/
    layout/
    movie/
    ui/
  pages/
  services/
  hooks/
  store/
```

---

## 🔮 Future Improvements

* 🎥 Trailer video player integration
* 🤖 AI-based movie recommendations
* 📊 Advanced filtering (genre, year, language)
* 👤 User profile system
* 🌐 Deployment (Vercel / Firebase Hosting)

---

## 📸 Screenshots

*Add your app screenshots here*

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Author

**Malik Obaid Ur Rehman**

---

⭐ If you like this project, give it a star on GitHub!
