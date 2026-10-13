# Project Architecture

## Overview
Aerux adalah aplikasi full-stack modern yang dibangun dengan React, Vite, dan Tailwind CSS. Proyek ini mengikuti clean architecture principles dengan folder structure yang well-organized dan scalable.

## Tech Stack Decision

### Frontend Framework
- **React 19**: Latest features, better performance, improved JSX
- **Vite**: Ultra-fast build tool with instant HMR
- **Tailwind CSS**: Utility-first CSS for rapid UI development

### State Management
- **Zustand**: Lightweight, simple API, no boilerplate
- Best for: Simple to moderate state management needs
- Alternative: Redux, Recoil (jika complexity meningkat)

### Routing
- **React Router v7**: Latest routing solution with modern features
- Supports: Lazy loading, dynamic routes, nested routing

### Animations
- **Framer Motion**: Industry standard for React animations
- Provides: Smooth transitions, gesture support, layout animations

### HTTP Client
- **Axios**: Simple HTTP client with interceptors
- Benefits: Request/response handling, error management, timeout control

### UI Components & Icons
- **React Icons**: Comprehensive icon library
- **React Hot Toast**: Beautiful toast notifications
- Custom components: Button, Card, Input, Modal, etc.

## Folder Structure

```
project-aerux/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Button.jsx        # CTA & action buttons
│   │   ├── Card.jsx          # Container component
│   │   ├── Input.jsx         # Form input
│   │   ├── Modal.jsx         # Dialog/modal
│   │   ├── Badge.jsx         # Status badges
│   │   ├── Avatar.jsx        # User avatars
│   │   ├── Skeleton.jsx      # Loading placeholders
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── Navbar.jsx        # Navigation
│   │   ├── Logo.jsx          # Logo component
│   │   ├── MainLayout.jsx    # Main layout wrapper
│   │   └── index.js          # Component exports
│   │
│   ├── pages/                # Page components
│   │   ├── LandingPage.jsx   # Landing/home page
│   │   ├── DashboardPage.jsx # Dashboard with CRUD
│   │   └── index.js          # Page exports
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── index.js          # useLocalStorage, useWindowSize, useDebounce
│   │
│   ├── store/                # Zustand stores
│   │   └── index.js          # useAuthStore, useUIStore, useProductsStore
│   │
│   ├── api/                  # API integration
│   │   ├── client.js         # Axios instance with interceptors
│   │   ├── services.js       # API endpoint functions
│   │   └── errorHandler.js   # Error handling utilities
│   │
│   ├── utils/                # Utility functions
│   │   └── helpers.js        # Validation, formatting helpers
│   │
│   ├── constants/            # App constants
│   │   ├── index.js          # Routes, HTTP status, etc.
│   │   └── env.js            # Environment variables
│   │
│   ├── styles/               # Global styles
│   │   └── index.css         # Tailwind directives
│   │
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # React root entry
│
├── .env                      # Environment variables
├── .env.example              # Example env template
├── .prettierrc               # Prettier config
├── tailwind.config.js        # Tailwind theme config
├── postcss.config.js         # PostCSS config
├── vite.config.js            # Vite config with aliases
├── package.json              # Dependencies & scripts
└── README.md                 # Project documentation
```

## Component Hierarchy

```
App
├── Router
├── Route: / → LandingPage
│   └── MainLayout
│       ├── Navbar
│       ├── HeroSection
│       │   ├── Badge
│       │   ├── Button (CTA)
│       │   └── Statistics Cards
│       ├── FeaturesSection
│       │   └── Card[] (Feature cards)
│       ├── PricingSection
│       │   ├── Badge
│       │   └── Card[] (Pricing plans)
│       ├── CTASection
│       └── Footer
│
└── Route: /dashboard → DashboardPage
    └── MainLayout
        ├── Navbar
        ├── Statistics Cards[] (StatCard)
        ├── SimpleChart
        ├── DataTable
        │   └── Modal (Add/Edit Product)
        │       ├── Input
        │       └── Button
        ├── Button (Add Product)
        └── Input (Search)
```

## Data Flow

### Authentication Flow
```
User Input → Form Validation → API Call (authAPI.login)
↓
API Response → Zustand Store (useAuthStore) → LocalStorage
↓
Redirect to Dashboard → Display User Data
```

### Product CRUD Flow
```
User Action → Modal/Form Input → Form Validation
↓
API Call (productsAPI.create/update/delete)
↓
Response → Zustand Store (useProductsStore)
↓
UI Update → Toast Notification
```

### Error Handling Flow
```
API Error → errorHandler (handleAPIError)
↓
Toast Notification (error message)
↓
If 401 → Clear auth → Redirect to login
↓
If other error → Display error message → Allow retry
```

## State Management Strategy

### Zustand Store Structure

**useAuthStore**
```js
{
  user: User | null,
  isAuthenticated: boolean,
  login(userData),
  logout(),
  updateUser(userData)
}
```

**useUIStore**
```js
{
  isDarkMode: boolean,
  isSidebarOpen: boolean,
  toggleDarkMode(),
  toggleSidebar()
}
```

**useProductsStore**
```js
{
  products: Product[],
  loading: boolean,
  error: string | null,
  setProducts(),
  addProduct(),
  updateProduct(),
  deleteProduct(),
  setLoading(),
  setError()
}
```

## API Client Architecture

### Request Flow
```
API Call → Axios Instance
↓
Request Interceptor (Add Auth Token)
↓
HTTP Request
↓
Response Interceptor
↓
Check Status → Handle/Return Data or Error
↓
Error Handler → Toast Notification
```

### Available API Services

**productsAPI**
- `getAll()` - Fetch all products
- `getById(id)` - Fetch single product
- `create(data)` - Create product
- `update(id, data)` - Update product
- `delete(id)` - Delete product

**authAPI**
- `login(email, password)` - User login
- `register(data)` - User registration
- `logout()` - User logout
- `profile()` - Get current user

**usersAPI**
- `getAll()` - Fetch all users
- `getById(id)` - Fetch user details
- `update(id, data)` - Update user
- `delete(id)` - Delete user

**analyticsAPI**
- `getStats()` - Get statistics
- `getRevenue()` - Get revenue data

## Styling Strategy

### Tailwind CSS Configuration

**Custom Colors**
```js
primary: { 50-900 }    // Purple gradient
secondary: { 50-900 }  // Blue gradient
dark: { 50-950 }       // Dark theme
accent: { teal, pink, blue, green }
```

**Custom Features**
- Glass morphism effects
- Gradient backgrounds
- Soft shadows
- Custom animations
- Extended spacing

### Design System

**Typography**
- Headings: 4xl to 7xl (landing), 2xl-4xl (UI)
- Body: base to lg
- Small: xs to sm
- Font: Inter (system-ui fallback)

**Spacing**
- Base: 4px
- Components: 1rem (16px) to 3rem (48px)
- Responsive: Different spacing for mobile/tablet/desktop

**Colors**
- Primary: #9464ff (Purple)
- Secondary: #8b9dff (Blue)
- Background: #0a0e27 (Dark)
- Text: #f3f4f6 (Light)

**Shadows**
- soft: Small elevation
- soft-lg: Medium elevation
- soft-xl: Large elevation
- glow: Gradient glow effect

## Performance Optimizations

1. **Code Splitting**: Lazy loading with React.lazy()
2. **Image Optimization**: Use modern formats
3. **Bundle Optimization**: Vite tree-shaking
4. **Component Memoization**: React.memo for expensive components
5. **Debouncing**: Search inputs with useDebounce
6. **Caching**: Zustand persist middleware

## Security Considerations

1. **Token Storage**: LocalStorage (consider secure HTTP-only cookies)
2. **CORS**: Configure properly on backend
3. **HTTPS**: Use in production
4. **Input Validation**: Client & server-side
5. **API Keys**: Never commit to repo, use .env
6. **XSS Prevention**: React escapes by default
7. **CSRF**: Implement tokens if needed

## Development Workflow

1. **Component Development**
   - Create component in `components/`
   - Export in `components/index.js`
   - Use in pages/other components

2. **Page Development**
   - Create page in `pages/`
   - Add route in `App.jsx`
   - Use layout wrapper for consistency

3. **API Integration**
   - Add endpoint in `api/services.js`
   - Use in components with error handling
   - Store data in Zustand if needed

4. **Styling**
   - Use Tailwind utility classes
   - Use custom theme colors
   - Test responsive design
   - Check animations smoothness

## Deployment Checklist

- [ ] Update environment variables
- [ ] Run `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Check bundle size
- [ ] Verify API endpoints
- [ ] Test on different browsers
- [ ] Test responsive design
- [ ] Check performance metrics
- [ ] Deploy to hosting

## Future Enhancements

1. **TypeScript**: Add type safety
2. **Testing**: Jest + React Testing Library
3. **Backend**: Node.js/Express API
4. **Database**: PostgreSQL/MongoDB
5. **Authentication**: OAuth, JWT
6. **PWA**: Service workers, offline support
7. **Analytics**: Track user behavior
8. **SEO**: Server-side rendering with Next.js
