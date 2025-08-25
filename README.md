# Raccoon Mortgage

Raccoon Mortgage is a lightweight calculator app for single and bulk mortgage applicants. It supports manual entry or CSV import, computes mortgage details, and securely persists applicant data using IndexedDB for easy retrieval and management.

## Installation and run

1. Clone the repo
2. Install the dependencies (once). Then Run the app:

  ```bash
  npm install
  npm run dev
  ```

3. To run the tests:

  ```bash
  npm run test
  ```

4. If you want a test coverage:

  ```bash
  npm run test:coverage
  ```

5. Use the `/sample.csv` provided file to use the bulk mortgage calculator option.

## Approach

Raccoon Mortgage follows a separation of concerns for maintainability:

- **File Structure:**
  - `src/` - Main source code
    - `assets/` - Contains images and other static assets used throughout the application for UI and documentation.
    - `componentes/` - Houses reusable UI components, primarily built with Shadcn, to ensure consistent design and efficient development across the app.
    `constants/` - Contains static values and configuration constants used throughout the application for consistency and easy maintenance.
    - `lib/` - Contains core logic for data processing, validation, and utility functions.
    - `pages/` - Contains the main application pages, including the mortgage calculator, bulk import interface, and applicant management views
    - `routes/` - Contains React Router configuration and route definitions, organizing navigation logic and page mapping.
    - `rules/` - This directory centralizes business rules and reusable modules that support mortgage calculations and data integrity throughout the application.
    - `services/` - Manages interactions with external APIs, handles data persistence, and encapsulates logic for communicating with backend services. This layer abstracts network requests and storage operations, ensuring a clean separation between business logic and infrastructure concerns.
  - `README.md` - Documentation

- **Design Principles:**
  - **Modular CSV Handling:** CSV parsing and normalization are implemented as distinct modules, promoting clarity and reusability.
  - **Separation of Concerns:** Each responsibility-parsing, validation, business rules—is isolated for easier updates and debugging.
  - **Configurable Thresholds:** Threshold values are defined in a dedicated configuration file, enabling centralized setup and straightforward adjustments.

## External Dependencies

- **zod**: Provides schema-based validation for data integrity.
- **shadcn**: A collection of reusable React components built with Radix UI and Tailwind CSS for rapid UI development.
- **jest**: A JavaScript testing framework for writing and running unit tests with a focus on simplicity and performance.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom user interfaces.
- **idb**: A small library that provides a modern, promise-based API for IndexedDB in browsers.
- **lucide-react**: A set of open-source, customizable SVG icons for React applications.

## Learnings

- **Validation with Zod**: Using Zod for schema validation ensures that incoming data matches expected formats. It simplifies error handling and makes the codebase more robust against malformed input. Zod's composability allows for easy extension and maintenance of validation rules.
