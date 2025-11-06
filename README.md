# Adopt a Coral App

A beautiful web application for managing coral adoptions, allowing users to track their adopted corals and receive updates from scientists, while providing an easy interface for scientists to upload photos and status updates.

## Features

### For Adopters
- **Home Page**: View all active adoptions with beautiful coral cards
- **Coral Detail Page**: See detailed information about your adopted coral
- **Recent Updates**: View photos, descriptions, and dates of coral updates from scientists
- **Donation Management**: 
  - Make one-time donations
  - Renew subscriptions
  - Cancel adoptions (with automatic scientist notification)
- **Learn Section**: Educational content about responsible tourism and reef-safe sunscreen

### For Scientists/Admin
- **Admin Portal**: Easy interface to upload coral updates
- **Update Management**: Post photos, descriptions, and dates for each coral
- **Cancellation Tracking**: View which adoptions have been cancelled (no updates sent)
- **Status Overview**: Quick view of adoption statistics

## Technology Stack

- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **LocalStorage** - Data persistence (can be replaced with a backend API)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, etc.)
├── pages/           # Page components
│   ├── Home.jsx     # Home page with adoptions
│   ├── CoralDetail.jsx  # Individual coral details
│   ├── CoralUpdates.jsx # Updates for a coral
│   ├── Donation.jsx     # Donation management
│   ├── Learn.jsx        # Educational content
│   └── Admin.jsx        # Scientist/admin portal
├── data/            # Mock data and storage utilities
└── App.jsx          # Main app component with routing
```

## Key Features Explained

### Cancellation System
When a user cancels an adoption:
1. The adoption status is updated to "cancelled"
2. Scientists are automatically notified (currently logged to console)
3. Admin panel shows cancelled adoptions and prevents updates
4. No further updates are sent for cancelled adoptions

### Data Storage
Currently uses localStorage for persistence. In a production app, you would:
- Replace localStorage calls with API calls
- Set up a backend server (Node.js, Python, etc.)
- Use a database (PostgreSQL, MongoDB, etc.)
- Implement proper authentication

## Future Enhancements

- Payment integration (Stripe, PayPal)
- User authentication and accounts
- Email notifications
- Image upload (instead of URLs)
- Real-time updates
- Mobile app version

## License

This project is open source and available for use.

