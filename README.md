# London Air Quality Monitoring WebApp

A React-based web application for monitoring air quality parameters at various locations in London using the OpenAQ API.

## Live Demo
**Live Demo**: [https://london-air-quality.vercel.app/](https://london-air-quality.vercel.app/)

## Features

### Core Functionality
- **Station Selection**
  - Dropdown/search field for London monitoring stations

- **Current Readings Display**
  - Latest NO2 and O3 measurements
  - Timestamp information
  - Measurement units
  - Visual status indicators
  - Color-coded health indicators

- **Historical Data Visualization**
  - Interactive charts for NO2 and O3 trends
  - 7/30 day view options
  - Tooltips and detailed information
  - Historical data comparison

### Additional Features
- Responsive, mobile-first design
- Real-time data updates
- Error handling and loading states
- Interactive data visualization

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Data Fetching:** Axios
- **Charts:** Chart JS (react chart js)
- **Serverless Functions**: Vercel API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- OpenAQ API key
- Vercel CLI (for local development with serverless functions)

### Installation

1. Clone the repository
```bash
git clone [https://github.com/uddinArsalan/London-Air-Quality.git]
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

Set up environment variables:

```env
OPENAQ_API_KEY=your_openaq_api_key_here
```

Install Vercel CLI globally:

```bash
npm install -g vercel
```

Start the development server:

```bash
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```bash
src/
  ├── components/
  │   ├── CurrentReading/
  │   ├── HistoricalData/
  │   ├── StationSelector/
  │   
  ├── api/
  │   ├── historical.ts
  │   ├── openaqstations.ts
  │   └── stationInfo.ts
  ├── .env   # Environment variables (create this)
  ├── types/
  └── utils/
```


## Project Structure Overview

| **Component Folder**      | **Description**                                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `components/StationSelector` | UI for selecting air quality stations in London (NO₂ & O₃ supported only).                                    |
| `components/CurrentReading`  | Displays latest NO₂ and O₃ measurements with timestamps, units, and visual indicators.                        |
| `components/HistoricalData`  | Renders interactive charts (7/30 days) showing historical trends for NO₂ and O₃.                             |
| `api/`                      | Contains API utility functions to fetch station list, current readings, and historical data.                   |
| `types/`                    | TypeScript types used throughout the app for consistency and type safety.                                     |
| `utils/`                    | Utility functions for formatting data, timestamps, and visual indicator logic.                                |
-->

## Deployment

The app is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables in Vercel
4. Deploy