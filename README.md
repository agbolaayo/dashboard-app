# Angular Dashboard Application

An Angular-based dashboard application designed for displaying interactive data visualizations and UI components. Built with Angular CLI v19.2.13.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development Server](#development-server)
- [Building the Project](#building-the-project)
- [Running Unit Tests](#running-unit-tests)
- [Application Structure](#application-structure)

## Prerequisites

Before you begin, ensure the following are installed:

- **Node.js**: [Download here](https://nodejs.org)
- **Angular CLI** (v19.2.13 recommended):

```bash
npm install -g @angular/cli@19.2.13
````

## Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
cd <project-directory-name>
```

## Installation

Install dependencies:

```bash
npm install
```

## Development Server

Run the development server:

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200) to view the app. Use `-o` to auto-open the browser:

```bash
ng serve -o
```

## Building the Project

Build for development:

```bash
ng build
```

Build for production:

```bash
ng build --configuration production
```

## Running Unit Tests

This project uses **Karma** as the test runner and **Jasmine** for writing unit tests.

To run unit tests:

```bash
ng test
```

This launches the Karma test runner, which opens a browser and displays test results. Tests re-run on file changes.

## Application Structure

Key features and structure of the app include:

* **Modular Dashboard Architecture**:

  * `DashboardModule` contains core components like:

    * `SidebarComponent`: Sidebar navigation
    * `InfoCardComponent`, `DataTableCardComponent`, `AttackPathCardComponent`, etc.: Data display components
    * `ModalComponent`: For dialogs

* **Services**:

  * `ThemeService`: Manages themes, mobile responsiveness, and UI state
  * `ModalService`: Controls modals and their content

* **Styling**:

  * SCSS-based with global `styles.scss`
  * Theming via CSS variables

* **Typed Interfaces**:

  * Strongly typed data models (e.g., `dashboard.types.ts`)

* **Constants Management**:

  * Config values centralized in `dashboard.constants.ts`
