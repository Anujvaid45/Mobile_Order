# Mobile_Order Website using MERN Stack

## Overview

This project is a mobile Ordering website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a platform for users to browse products, add them to the cart, and make purchases.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js and npm installed. [Download Node.js](https://nodejs.org/)
- MongoDB installed. [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anujvaid45/Mobile_Order.git
   cd Mobile_Order
   Install dependencies for both the backend and frontend:
   cd backend && npm install
   cd ../frontend && npm install
   
## Project Structure
- backend: Node.js server using Express.js.
- frontend: React.js application.
- database: MongoDB database configuration and schema.

## Running the Application
 ```bash
 start the frontend
  cd frontend
  npm run start
```
## Environment-Variables
1. **Create .env File:**
   Create a `.env` file in the backend directory of your project. This file will contain sensitive information and configurations. Ensure that this file is not shared publicly.

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   SECRET=myrandomsecretkey
   BRAINTREE_MERCHANT_ID=randommerchantid
   BRAINTREE_PUBLIC_KEY=randompublickey
   BRAINTREE_PRIVATE_KEY=randomprivatekey

## Deployment
### frontend:
https://mobile-order-three.vercel.app/
### backend:
https://mobile-backend-taxn.onrender.com/




