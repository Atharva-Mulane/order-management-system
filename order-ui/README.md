# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Real-Time Order Management System

This is a full-stack application for managing orders, built with React.js, Spring Boot, and AWS.

## Tech Stack

- **Frontend:** React.js, Bootstrap, Axios
- **Backend:** Spring Boot, Java, Maven
- **Database:** AWS DynamoDB
- **Storage:** AWS S3
- **Notifications:** AWS SNS
- **CI/CD:** GitHub Actions

## Features

- View a list of all orders on a dashboard.
- Create new orders via a form.
- Upload PDF invoices which are stored in S3.
- Real-time notifications on order creation using SNS.
- View details for a specific order.

## [cite_start]How to Run Locally [cite: 69]

### Backend (order-service)
1.  Navigate to the `order-service` directory.
2.  Add your AWS credentials to `src/main/resources/application.properties`.
3.  Run the command: `mvnw spring-boot:run`
4.  The backend will be available at `http://localhost:8080`.

### Frontend (order-ui)
1.  Navigate to the `order-ui` directory.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the application.
4.  The frontend will be available at `http://localhost:5173`.

## [cite_start]AWS Setup Instructions [cite: 67]

To run this project, you need to configure the following AWS resources:
1.  **S3 Bucket:** Create a bucket and disable "Block all public access".
2.  **DynamoDB Table:** Create a table named `Orders` with a partition key `orderId` (String).
3.  **SNS Topic:** Create a standard SNS topic and create an email subscription to it. Remember to confirm the subscription via email.
4.  **IAM User:** Create an IAM user with programmatic access and permissions for S3, DynamoDB, and SNS.

## [cite_start]API Reference [cite: 68]

API documentation is available via Swagger UI once the backend is running:
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)