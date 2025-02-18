# URL Shortener

A scalable and serverless URL shortener built with **Node.js**, **MongoDB Atlas**, and **AWS Lambda**. This project demonstrates how to build a modern, cloud-native application using the Serverless Framework.

---

## Features

- **Shorten Long URLs**: Convert long URLs into short, easy-to-share links.
- **Redirect to Original URLs**: Seamlessly redirect users from short URLs to the original long URLs.
- **Serverless Architecture**: Deployed on AWS Lambda for scalability and cost-efficiency.
- **MongoDB Atlas**: Cloud-based database for storing URLs.
- **Docker Support**: Containerized for easy local development and deployment.
- **Frontend Integration**: Built with React for a user-friendly interface.

---

## Tech Stack

- **Backend**:
  - Node.js
  - Serverless Framework
  - AWS Lambda
  - API Gateway
  - MongoDB Atlas
- **Frontend**:
  - React
  - CSS (for styling)
- **DevOps**:
  - Docker
  - GitHub Actions (for CI/CD)
- **Other Tools**:
  - Webpack (for bundling)
  - Dotenv (for environment variables)

---

## How It Works

1. **Shorten a URL**:
   - Send a `POST` request to `/shorten` with a long URL.
   - The backend generates a unique short ID and stores the mapping in MongoDB.
   - Returns the short URL (e.g., `https://your-domain.com/abc123`).

2. **Redirect to Original URL**:
   - When a user visits the short URL, the backend looks up the original URL in MongoDB.
   - Redirects the user to the original URL.

---

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- AWS account (for deployment)
- Docker (optional, for containerization)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener