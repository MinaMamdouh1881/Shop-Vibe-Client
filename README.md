# Shop Vibe Client

A modern e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **Vite**, and **Tailwind CSS**. Shop Vibe offers a stylish shopping experience for men and women, featuring collections, new arrivals, favorites, cart management, authentication, and checkout.

## Features

- Browse men's and women's collections by category
- View product details and images
- Add products to cart and favorites (with local storage support for guests)
- User authentication (login, signup, password reset, social login)
- Checkout flow with payment integration
- Responsive design with dark mode toggle
- Toast notifications for user feedback

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Vite](https://vitejs.dev/) for fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zod](https://zod.dev/) for form validation
- [React Hot Toast](https://react-hot-toast.com/) for notifications
- [React Icons](https://react-icons.github.io/react-icons/) for UI icons
- [Swiper](https://swiperjs.com/react) for product sliders

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/your-username/shop-vibe-client.git
cd shop-vibe-client
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set your backend API URL:

```
VITE_BASE_URL=http://localhost:4000
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

### Lint

To run ESLint:

```sh
npm run lint
```

## Project Structure

```
src/
  components/      # Reusable UI components
  pages/           # Route-based pages
  redux/           # Redux slices and API services
  types/           # TypeScript types
  validation/      # Zod validation schemas
  assets/          # Static assets
  App.tsx          # Main app component with routing
  main.tsx         # Entry point
public/            # Static files (images, favicon)
```

## Customization

- **Styling:** Uses Tailwind CSS and custom variables for easy theming.
- **Dark Mode:** Toggle available in the navbar.
- **API:** Connects to a backend via `VITE_BASE_URL`.

## License

MIT

---

**Note:** This is the client-side application. You need a compatible backend
