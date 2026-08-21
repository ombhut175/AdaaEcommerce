# Adaa Ecommerce Architecture Diagram

This document provides a high-level architectural overview of the Adaa Ecommerce platform, illustrating the interaction between the frontend, backend, and external services.

## Architecture Flow

```mermaid
graph TD
    %% Frontend Subsystem
    subgraph Frontend [Frontend (React.js + Vite)]
        UI[UI Components & Pages]
        State[State Mgmt: Redux Toolkit + Context API]
        Router[Routing: React Router DOM]
        API_Client[API Client: Axios]
        WS_Client[WebSocket: Socket.io-client]
        Styles[Styling: TailwindCSS + Styled Components]
        3D_Animations[3D & Animations: Three.js + Framer Motion]
        
        UI --> State
        UI --> Router
        State --> API_Client
        UI --> WS_Client
        UI --> Styles
        UI --> 3D_Animations
    end

    %% Backend Subsystem
    subgraph Backend [Backend (Node.js + Express)]
        Express_Routes[Express Routes: API Endpoints]
        Controllers[Controllers: Business Logic]
        Services[External Services Handlers]
        Middlewares[Middlewares: Auth, Multer, Error Handling]
        Models[Mongoose Models: Schema Definitions]
        WebSocket[Socket.io Server]
        
        Express_Routes --> Middlewares
        Express_Routes --> Controllers
        Controllers --> Services
        Controllers --> Models
        WebSocket --> Services
    end

    %% External Services
    subgraph External [External Services & DB]
        MongoDB[(MongoDB Database)]
        Cloudinary[Cloudinary: Image/Asset Storage]
        Razorpay[Razorpay: Payment Gateway]
        OAuth[Google OAuth: Authentication]
        Email_SMS[Nodemailer / Twilio: Notifications]
    end

    %% Interactions
    API_Client -- "HTTP/REST API Requests" --> Express_Routes
    WS_Client -- "Real-time WebSockets" --> WebSocket
    
    Models -- "Mongoose ODM" --> MongoDB
    Services -- "Upload Media" --> Cloudinary
    Services -- "Process Payments" --> Razorpay
    Services -- "Send OTPs/Emails" --> Email_SMS
    Middlewares -- "Verify Identity" --> OAuth
```

## Component Breakdown

### 1. Frontend 
- **Framework:** React.js built with Vite.
- **Routing:** React Router DOM (with Protected Routes).
- **State Management:** Redux Toolkit (for global state) and React Context API.
- **Styling & UI:** Tailwind CSS, Styled Components.
- **Interactivity:** Framer Motion for animations, Three.js for 3D elements.
- **Communication:** Axios for REST API calls and Socket.io-client for real-time updates.

### 2. Backend 
- **Framework:** Node.js with Express.js.
- **Architecture Pattern:** MVC-like (Routes -> Controllers -> Models/Services).
- **Database:** MongoDB queried via Mongoose ODM.
- **Real-time Engine:** Socket.io.
- **Security & Auth:** JWT (JSON Web Tokens), bcrypt for password hashing, and Passport.js for Google OAuth.
- **File Handling:** Multer for multipart form data, integrated with Cloudinary.

### 3. External Integrations
- **Database:** MongoDB (Persistent Storage).
- **Media Storage:** Cloudinary.
- **Payments:** Razorpay.
- **Authentication:** Google OAuth20.
- **Notifications/Communication:** Nodemailer (Emails) and Twilio (SMS).
