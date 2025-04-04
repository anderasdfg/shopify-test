# Shopify Test

A modern e-commerce application built with Next.js and TypeScript.

## Tech Stack

- **Framework:** Next.js 15.2.4
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Carousel:** Swiper
- **Development Tools:**
  - ESLint
  - Turbopack
  - TypeScript

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable React components
├── context/      # React context providers
├── mocks/        # Mock data for development
├── assets/       # Static assets
├── constants/    # Application constants
├── types/        # TypeScript type definitions
├── services/     # API and service functions
└── lib/          # Utility functions and helpers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add necessary environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Development

The project uses modern development tools and practices:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Turbopack** for fast development builds
- **Tailwind CSS** for styling

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
