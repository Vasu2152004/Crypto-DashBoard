# CryptoDash - Real-time Cryptocurrency Dashboard

A modern, sleek, and fully responsive cryptocurrency dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Track real-time cryptocurrency prices, market data, and trends using the CoinGecko API.

## 🚀 Features

### 📊 Markets Page (`/`)
- **Real-time Data**: Display top 50 cryptocurrencies with live market data
- **Smart Search**: Client-side filtering by name or symbol with debounced input
- **Advanced Filtering**: Sort by market cap rank, 24h change, or volume
- **Responsive Design**: Mobile-first layout with elegant desktop experience
- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful error states with retry functionality

### 🪙 Coin Details (`/coin/[id]`)
- **Comprehensive Data**: Live price, market cap, volume, rank, supply info
- **Interactive Charts**: Beautiful price charts with multiple time ranges (24h, 7d, 30d, 90d)
- **Market Statistics**: All-time highs/lows, price changes, market cap changes
- **Watchlist Integration**: Add/remove coins from your personal watchlist

### ⭐ Watchlist (`/watchlist`)
- **Personalized Tracking**: Save your favorite cryptocurrencies
- **Persistent Storage**: Uses localStorage for data persistence
- **Real-time Updates**: Refreshed data for all watchlist items
- **Easy Management**: Add/remove coins with one click

### 🎨 Design & UX
- **Modern UI**: Clean, professional design with smooth animations
- **Dark Mode**: Automatic dark mode support
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized with debounced search and efficient rendering

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **API**: CoinGecko (Free Tier)
- **State Management**: React hooks (useState, useEffect)
- **Persistence**: localStorage

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── coin/[id]/         # Coin detail page
│   ├── watchlist/         # Watchlist page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Markets page
├── components/            # Reusable UI components
│   ├── CoinTableRow.tsx   # Individual coin row
│   ├── FilterDropdown.tsx # Sort/filter dropdown
│   ├── LoadingSkeleton.tsx # Loading animations
│   ├── Navigation.tsx     # App navigation
│   ├── PriceChart.tsx     # Interactive charts
│   └── SearchBar.tsx      # Search input
├── hooks/                 # Custom React hooks
│   └── useWatchlist.ts    # Watchlist management
├── lib/                   # Utilities and API
│   ├── api.ts            # CoinGecko API client
│   └── utils.ts          # Helper functions
└── types/                # TypeScript interfaces
    └── index.ts          # Type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app uses CoinGecko's free API tier.

### API Rate Limits
The CoinGecko API has rate limits:
- Free tier: 50 calls/minute
- The app is optimized to minimize API calls

## 🎯 Key Features Explained

### Debounced Search
Search input is debounced to prevent excessive API calls and improve performance.

### Responsive Design
The dashboard is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography

### Error Handling
Comprehensive error handling with:
- Network error recovery
- Graceful fallbacks
- User-friendly error messages
- Retry mechanisms

### Performance Optimizations
- Debounced search input
- Efficient re-rendering
- Optimized image loading
- Minimal bundle size

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)
- **Neutral**: Gray scale

### Typography
- **Font**: Geist Sans (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Components
- **Consistent Spacing**: 4px base unit
- **Border Radius**: 6px, 8px, 12px
- **Shadows**: Subtle elevation system
- **Transitions**: 200ms ease-in-out

## 🔮 Future Enhancements

- [ ] Real-time price updates with WebSocket
- [ ] Portfolio tracking with P&L calculations
- [ ] Price alerts and notifications
- [ ] Advanced charting with technical indicators
- [ ] News feed integration
- [ ] Export data to CSV/PDF
- [ ] PWA support for mobile apps
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com/) for providing the free API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Lucide](https://lucide.dev/) for the icon set

---

Built with ❤️ for the crypto community
