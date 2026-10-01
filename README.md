# AirAsia Flight & Hotel Booking Platform

A high-performance, responsive travel booking web platform designed with AirAsia branding, featuring a **Glass Morphism** interactive search card, multi-currency conversion, hotel bookings, flight search, interactive seat selection, and client-side reservation management.

## ✨ Key Features

- **Glass Morphism Hero & Search Card**: Translucent crystalline card with multi-layered specular highlights, blur saturation, and frosted input capsules.
- **Flight Search & Booking**: Real-time origin/destination search (DAC, KUL, SIN, BKK, DMK, DPS, CGK, HKT, CNX, PEN, BKI, KCH), date pickers, passenger counter, and one-way/round-trip support.
- **Organized Controls**: Quick swap button, search reset button, and AirAsia gradient CTA.
- **Interactive Aircraft Seatmap**: Visual 3-3 aircraft seat selector with standard, hot seats, and aisle indicators.
- **Hotel Reservations**: Search hotels across top destinations with interactive filters, reviews, and amenities.
- **Multi-Currency Converter**: Live price switching across BDT, MYR, USD, SGD, THB, and IDR.
- **Booking Management**: View, download, print, or cancel demo bookings with full localStorage persistence.
- **Mobile Responsive**: Custom drawer navigation, glass footer, and adaptive grid system.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server (Port 3000)
npm run dev

# 3. Build production bundle (into dist/)
npm run build
```

---

## 📦 How to Deploy to GitHub

### Option A: Deploy to GitHub & Host on GitHub Pages (Recommended)

1. **Create a new GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Enter a repository name (e.g., `airasia-booking-platform`).
   - Leave it **Public** (or Private) and do **not** initialize with README or license.
   - Click **Create repository**.

2. **Push your code to GitHub**:
   Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - On GitHub, go to your repository **Settings** tab.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - That's it! The included `.github/workflows/deploy.yml` workflow will automatically build your app and deploy it to `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`.

---

### Option B: Deploy to Vercel or Netlify via GitHub

1. Push your repository to GitHub (following the steps in Option A).
2. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Click **Add New Project** and select your GitHub repository.
4. Framework Preset will automatically detect **Vite**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

---

## 🛠️ Tech Stack

- **HTML5 & CSS3**: Modern CSS Variables, Flexbox, CSS Grid, Glassmorphism backdrop-filters.
- **Vanilla TypeScript & JavaScript**: Fast, zero-dependency client state and localStorage persistence.
- **Vite & Tailwind CSS**: Instant build tooling and atomic utility styles.
- **GitHub Actions**: Continuous Deployment pipeline for GitHub Pages.
