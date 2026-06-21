# Quick Start Guide - पृथ्वी है हमारा

## 🚀 Running the Application

### Option 1: Development Mode (Recommended)

```bash
cd /app/prithvi-app
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Option 2: Build and Preview Production

```bash
cd /app/prithvi-app
npm install
npm run build
npm run preview
```

## 🎯 Testing the Application

### Test Authentication Flow:
1. Go to `/signup` and create an account
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   
2. After signup, you'll be automatically logged in and redirected to home

3. Try accessing protected routes:
   - `/profile` - View your dashboard
   - `/schedule-pickup` - Schedule a pickup

### Test Features:
- **Home Page**: Hero carousel (auto-rotates every 5 seconds)
- **About Page**: Mission, statistics, and how we help
- **Shop Page**: Eco-friendly products
- **Schedule Pickup**: Form with dynamic earnings calculator (₹15/kg)
- **Profile**: Dashboard with stats and pickup history

## 📱 Responsive Testing

The app is fully responsive. Test on:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1920px width

## 🔑 Key Features Implemented

✅ **Authentication**
- Mock localStorage-based auth
- Protected routes
- Login/Signup/Logout functionality

✅ **Pages**
- Home with carousel, features, blog section
- About with mission and stats
- Shop with products
- Schedule Pickup with form validation
- Profile dashboard with dummy stats

✅ **Design**
- Modern minimalist aesthetic
- Eco-friendly green + white palette
- Clean cards with hover effects
- Smooth transitions
- Mobile-first responsive design

✅ **User Experience**
- Auto-rotating carousel
- Form validation
- Dynamic earnings calculator
- Success messages
- Mobile hamburger menu

## 🛠️ Project Structure

```
/app/prithvi-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx & Home.css
│   │   ├── About.jsx & About.css
│   │   ├── Shop.jsx & Shop.css
│   │   ├── SchedulePickup.jsx & SchedulePickup.css
│   │   ├── Profile.jsx & Profile.css
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Auth.css
│   ├── data/
│   │   └── content.js (dummy data)
│   ├── utils/
│   │   └── auth.js (auth helpers)
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx (routing)
│   └── main.jsx (entry point)
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## 💾 LocalStorage Structure

**Users Array:**
```javascript
localStorage.getItem('users')
// [{ name: "Test User", email: "test@example.com", password: "password123" }]
```

**Current User:**
```javascript
localStorage.getItem('currentUser')
// { name: "Test User", email: "test@example.com" }
```

## 🎨 Color Palette

- Primary Green: `#2d5016`
- Secondary Green: `#4a7c59`
- Light Green: `#81c784`
- Accent Green: `#a5d6a7`
- White: `#ffffff`
- Off White: `#f8f9fa`

## 📝 Next Steps (Optional Enhancements)

1. **Backend Integration**
   - Connect to Supabase
   - Real authentication
   - Database for pickups and users

2. **Payment Integration**
   - Razorpay/Stripe for shop
   - Wallet system for earnings

3. **Advanced Features**
   - Email notifications
   - Real-time tracking
   - Admin dashboard
   - Image uploads
   - Social sharing

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions, refer to the main README.md file.

---

**Happy Coding! 🌍♻️**
