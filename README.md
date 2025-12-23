# MyWaterApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

## 🚀 Key Features
- **Smart Shopping Cart**: Persistent state management for seamless user experience.
- **Secure Checkout**: Integrated Auth Guards and Interceptors for protected routes.
- **Reactive UI**: Built with Tailwind CSS 4 and Angular Material for a polished, responsive feel.

## 🛠 Tech Stack
- **Framework**: Angular 19 (Signals, Standalone Components, Latest Control Flow)
- **State Management**: Lightweight Signal-based Stores (`/src/app/core/store`)
- **Styling**: Tailwind CSS 4
- **Tools**: RxJS, Angular Material, Angular Router

## 📂 Architecture
The project follows an **Enterprise Folder Structure**:
- `core/`: Singleton services, guards, interceptors, and global state.
- `features/`: Domain-specific modules (Auth, Home, Shop, Orders) using lazy loading.
- `shared/`: Reusable components, pipes, and directives.

## 🚦 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`.
