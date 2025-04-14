# Next.js Dashboard

This project is a dashboard implementation, featuring interactive data visualization components built with Next.js, TypeScript, and Tailwind CSS. The dashboard displays query data in both line chart and heatmap formats, allowing users to analyze trends across different brands and time periods.

<!-- Live link to the deployment -->
[**View Live**](https://8-million-stories.vercel.app/)

## Features Implemented

### Core Components

- **Header Component**: A responsive navigation header with desktop and mobile views, featuring dropdown menus and client information selection.
- **Line Chart**: Interactive line chart displaying query data by month with toggleable brand selection.
- **Quarterly Heatmap**: Visual representation of data across quarters with color-coded intensity levels.
- **API Route**: Dynamic data generation endpoint that produces randomized brand data based on query parameters.


### Technical Implementation

#### Frontend

- **React Components**: Modular component architecture with proper state management using React hooks.
- **Responsive Design**: Mobile-first approach with Tailwind CSS for styling and responsive layouts.
- **Dynamic Imports**: Used Next.js dynamic imports for client-side only libraries like ApexCharts.
- **Data Visualization**: Implemented with ApexCharts for interactive charts with annotations and customizable options.


#### Backend \& Data Handling

Created a Next.js API route (`/api/data`) that generates random data for visualization.


#### Performance Optimization

- **Code Splitting**: Implemented with dynamic imports to reduce initial bundle size.
- **Memoization**: Used React's useMemo and useCallback hooks to optimize rendering performance.
- **Conditional Rendering**: Components only render when data is available.


#### DevOps \& Deployment

- **CI/CD Pipeline**: Implemented with Vercel for automatic deployments.
- **Version Control**: Used Git with feature-based branching strategy.
- **Preview Deployments**: Configured Vercel to create preview deployments for pull requests.


## Architecture

The application follows a modern React architecture with Next.js:

1. **Pages**: Entry points for routes using Next.js page router
2. **Components**: Reusable UI elements
3. **API Routes**: Implemented in Next.js
4. **Hooks**: Custom React hooks for state management and data fetching

## Technical Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: ApexCharts
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics


## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn


### Installation and Running

```bash
# After clone and cd into the project directory

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```


## Deployment

The application is configured for deployment with Vercel. Connected my GitHub repository to Vercel for automatic deployments.





