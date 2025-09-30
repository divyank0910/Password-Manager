# 🔐 Password Manager

A full-stack password manager application built with a modern tech stack.

-   **Author:** Divyank Sharma
-   **Contact:** [divyanksharma84@gmail.com](mailto:divyanksharma84@gmail.com)

---

## 🛠️ Technologies Used

### Backend

-   **Database:** MongoDB
-   **Framework:** Express.js
-   **Authentication:** JSON Web Tokens (JWT) for authorization & Bcrypt for hashing
-   **Middleware:** CORS for resolving cross-origin requests
-   **Development:** Nodemon for automatic server restarts

### Frontend

-   **Framework:** React.js (bootstrapped with Vite)
-   **Styling:** TailwindCSS
-   **API Calls:** Axios for promise-based HTTP requests
-   **UI Feedback:** React-Hot-Toast for responsive notifications
-   **Date Handling:** Moment.js for date calculations and formatting

---

## 🚀 Getting Started

This project is not currently hosted. To run it locally, please follow the steps below.

### Prerequisites

-   Node.js and npm installed
-   A running instance of MongoDB

### Backend Setup

1.  Clone the repository and navigate to the `backend` directory.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Ensure your `package.json` file includes the `start` script:
    ```json
    "scripts": {
      "start": "nodemon app.js"
    }
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory in a new terminal window.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
