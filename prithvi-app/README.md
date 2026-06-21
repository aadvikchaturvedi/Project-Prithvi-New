# पृथ्वी है हमारा (Prithvi Hai Hamara)

A modern, eco-friendly sustainability web application focused on plastic recycling in India.

## 🌍 Features

- **Schedule Plastic Pickup**: Book doorstep collection at your convenience
- **Door-to-Door Collection**: Trained volunteers collect plastic waste from your home
- **Eco Rewards**: Earn ₹15 per kg of plastic recycled
- **Eco-Friendly Shop**: Purchase sustainable products made from recycled materials
- **Impact Dashboard**: Track your recycling stats, earnings, and environmental impact
- **Mock Authentication**: Frontend-only auth using localStorage

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Modern CSS with custom properties
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite for fast development and builds

## 📁 Project Structure

```
prithvi-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components (Navbar, Footer)
│   ├── pages/          # Page components (Home, About, Shop, etc.)
│   ├── data/           # Dummy data and content
│   ├── utils/          # Utility functions (auth helpers)
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component with routing
│   └── main.jsx        # App entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📱 Pages

1. **Home** (`/`): Hero carousel, features showcase, awareness blog section
2. **About** (`/about`): Mission, problem statement, impact statistics
3. **Shop** (`/shop`): Eco-friendly products catalog
4. **Schedule Pickup** (`/schedule-pickup`): Form to schedule plastic collection (Protected)
5. **Profile** (`/profile`): User dashboard with stats and pickup history (Protected)
6. **Login** (`/login`): User authentication
7. **Signup** (`/signup`): New user registration

## 🔐 Authentication

Mock authentication system using localStorage:
- Users are stored in localStorage
- Login/Signup creates session in localStorage
- Protected routes redirect to login if not authenticated
- Logout clears current user session

## 🎨 Design

- **Color Palette**: Eco-friendly green and white theme
- **Typography**: Manrope for headings, Inter for body text
- **Layout**: Modern minimalist with clean cards and good spacing
- **Responsive**: Mobile-first design approach
- **Placeholder Images**: Descriptive labels instead of actual images

## 💰 Pricing Logic

- Rate: ₹15 per kg of plastic
- Dynamic earnings calculator on Schedule Pickup page
- Earnings tracked in Profile dashboard

## 🌱 Environmental Impact

The app tracks:
- Total plastic recycled (kg)
- Number of pickups completed
- Carbon footprint reduced (kg CO₂)
- Total earnings from recycling

## 📝 Dummy Data

All data is currently mocked in `src/data/content.js`:
- Carousel slides
- Feature cards
- Blog posts
- Products
- Pickup history (in Profile)

## 🔮 Future Enhancements

- Backend integration with Supabase
- Real payment processing
- Image uploads
- Email notifications
- Social sharing features
- Admin dashboard

## 📄 License

MIT License - Feel free to use this project for learning or building upon it.

## 🙏 Acknowledgments

Built with ❤️ for a sustainable future. Together, we can make India plastic-free!

---

**पृथ्वी है हमारा - Earth is Ours** 🌍♻️
