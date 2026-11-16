# Bank BPD Banten Operations Dashboard

A web-based banking operations dashboard built with React.js. The application brings several banking operation areas into one interface, including account management, money transfers, Virtual Accounts, Reports, Logs, and Setting Parameters.

The project is presented as a front-end dashboard for exploring common banking operation workflows.

## Overview

Bank BPD Operations Dashboard is designed to give bank operations users a single place to view and work with banking-related information. The interface is organized around the main operational areas of the application.

## Main Menus

### Dashboard
The main page provides an overview of the application and serves as the starting point for accessing other modules.

* Displays an overview of banking operations.
* Provides navigation to available modules.
* Gives users quick access to operational information.

### Account Management
Handles account-related information and provides access to account records.

* Inquiry account information.
* Browse available account records.
* Manage account data through the available actions.

### Money Transfers
Provides access to information related to money transfers.

* Send money transfers.
* View money transfers records.
* Monitor status transaction details.

### Virtual Accounts
Handles information related to virtual account services.

* View virtual account records.
* Access virtual account information.
* Manage virtual account data through the available actions.

### Reports
Provides operational reports and summarized information from the application.

* Search and download money transfers reports.
* Review available data summaries.

### Logs
Displays application activity records to help users review system activities.

* View user actions logs.
* Review recorded application activities.
* Track events for troubleshooting and monitoring purposes.

### Settings Parameter
Provides access to application configuration and operational parameters.

* Manage parameter values.
* View configured application parameters.
* Update available configuration settings.

## Technology Stack

- **React.js** — builds the user interface.
- **Vite** — development server and production build tool.
- **React Router DOM** — client-side page navigation.
- **Axios** — HTTP client for making API requests.
- **Lucide React** — interface icons.

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Clone the repository and open the project directory:

```bash
git clone https://github.com/23fitrah/bank-ops-dashboard.git
cd bank-ops-dashboard
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will show the local address in the terminal. Open that address in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Serves the production build locally. |

## Project Structure

```text
bank-ops-dashboard/
├── src/                 # Application source code
├── .env.example         # Example environment configuration
├── .gitignore
├── index.html           # HTML entry point
├── package.json         # Project metadata and scripts
├── package-lock.json    # Dependency lock file
└── vite.config.js       # Vite configuration
```

## Live Demo

https://ops-af23.vercel.app/

