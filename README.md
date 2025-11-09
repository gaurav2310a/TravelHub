# ✈️ TravelHub

A modern, feature-rich travel platform built with Next.js, React, and Tailwind CSS. Discover amazing destinations, connect with fellow travelers, and plan your dream vacations with our comprehensive travel community.

## ✨ Features

- **🌍 Destination Discovery**: Explore 1000+ handpicked destinations worldwide
- **🔍 Smart Search**: Advanced search with debounced input and multiple filters
- **🎯 Category Filtering**: Browse by destination type (Beach, Mountain, City, Cultural, Nature)
- **💰 Price Filtering**: Filter destinations by budget range
- **⭐ Rating System**: View and filter by traveler ratings
- **🗺️ Interactive Maps**: Discover nearby attractions and places
- **👥 Travel Community**: Share trips, connect with travelers, and get inspired
- **📱 Responsive Design**: Seamless experience across all devices
- **🌙 Dark Mode**: Beautiful dark theme support
- **🎨 Modern UI**: Glassmorphism effects, smooth animations, and gradient designs
- **🔐 Authentication**: Secure user authentication and profile management
- **📸 Trip Sharing**: Create and share your travel experiences with photos

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
travel/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── components/          # Shared components
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   └── Footer.jsx      # Site footer
│   │   ├── community/          # Community features
│   │   │   ├── page.jsx        # Community hub
│   │   │   ├── create-trip/    # Trip creation
│   │   │   ├── trips/          # Trip details
│   │   │   └── users/          # User profiles
│   │   ├── places/             # Destination pages
│   │   ├── nearby/             # Nearby attractions
│   │   ├── login/              # Authentication
│   │   ├── signup/             # User registration
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── context/                # React context
│   │   ├── TravelContext.jsx  # Travel state management
│   │   └── AuthContext.jsx    # Authentication context
│   └── lib/                    # Utilities
│       ├── trips.js           # Trip data & utilities
│       ├── communityTrips.js  # Community trip management
│       └── community.js       # Community features
└── public/                     # Static assets
```

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Lodash** - Utility functions (debounce)

## 🎨 Design Features

### Modern UI Components
- Glassmorphism effects for depth and elegance
- Smooth animations and transitions
- Gradient backgrounds and text effects
- Card hover effects with transforms
- Custom scrollbar styling

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized images and performance

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast ratios

## 📱 Key Pages

### Homepage
- Hero section with stunning visuals
- Advanced search and filtering
- Category exploration
- Featured community trips
- Trust badges and features
- Newsletter subscription

### Places
- Comprehensive destination listings
- Multiple filter options
- Detailed destination information
- Booking capabilities

### Community
- User-generated trip content
- Social features (likes, comments)
- Trip creation and sharing
- User profiles and activity

### Nearby
- Location-based recommendations
- Interactive map integration
- Distance-based filtering

## 🔧 Configuration

The application uses context-based state management. Key configurations:

- **TravelContext**: Manages search, filters, and destination state
- **AuthContext**: Handles user authentication and session management

## 🚀 Deployment

Build the production version:

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for travelers worldwide using Next.js, React, and modern web technologies.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, email hello@travelhub.com or join our community discussions.
