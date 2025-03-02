---
sidebar_position: 2
---

# Getting Started

This guide will help you set up and run the Crypto Price Tracker application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

## Running the Web Application

To start the development server for the web application:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`.

## Running the Documentation

To start the documentation site:

```bash
npm run docs:dev
# or
yarn docs:dev
```

This will start the Docusaurus development server at `http://localhost:3000`.

## Building for Production

### Web Application

To build the web application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Documentation

To build the documentation for production:

```bash
npm run docs:build
# or
yarn docs:build
```

The built documentation will be in the `docs/build` directory.