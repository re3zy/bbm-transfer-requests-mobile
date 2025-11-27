# Mobile Transfer Request Plugin

A mobile-optimized Sigma Computing plugin for displaying and managing transfer requests on mobile devices.

## Features

- 📱 Mobile-first design (375px optimized)
- 🔔 Red notification badge for new requests
- 📋 Transfer request details card
- 🏪 Store information (From/To)
- 📦 Quantity display (Requested & System Available)
- ⏱️ Days supply tracking
- 🎯 Action buttons (Verify Inventory / Decline Request)

## Deployment

This plugin is deployed on Netlify and ready to use in Sigma Computing workbooks.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Usage in Sigma

1. Add the plugin to your Sigma workbook
2. Configure the data source with your Active Transfers table
3. Map columns to the plugin fields
4. The plugin displays the first row as a mobile transfer request card

## Required Columns

- Transfer Id
- Status
- Product Name
- SKU Number
- Excess Store Name, City, State, Days
- Shortage Store Name, City, State
- Requested QTY
- Excess QTY

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Sigma Plugin SDK
- Mobile-optimized CSS

