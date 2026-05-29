# ShopSphere 🛍️

A modern full-stack eCommerce web application built using the **MERN Stack** with **Tailwind CSS**.  
ShopSphere provides a complete online shopping experience with secure authentication, product management, online payments, and role-based access for Admin and Users.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Search & Filter Products
- Add to Cart
- Place Orders
- Razorpay Payment Integration
- Order History
- Responsive UI

### 🛠️ Admin Features
- Admin Dashboard
- Manage Products
- Add / Update / Delete Products
- Manage Users
- Manage Orders
- Secure Admin Routes

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Context API / Redux

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### Payment Gateway
- Razorpay

---

## 📂 Project Structure

```bash
ShopSphere/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md


#clone my repo
git clone https://github.com/your-username/shopsphere.git
cd shopsphere


#Install Dependencies
Frontend ---
cd frontend
npm install


Backend ---
cd backend
npm install



🔐 Environment Variables ---
   PORT=5000
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret

   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_SECRET=your_secret_key



#▶️ Run the Application

Start Backend ---
cd backend
npm run server

Start Frontend ---
cd frontend
npm run dev


#🌐 API Features ---
Authentication APIs
Product APIs
Cart APIs
Order APIs
Payment APIs
Admin APIs

🔒 Authentication ---
ShopSphere uses JWT (JSON Web Token) for secure authentication and protected routes.

💳 Payment Integration ---
Integrated with Razorpay for secure online payments.

📱 Responsive Design ----/
Fully responsive UI built with Tailwind CSS for mobile, tablet, and desktop devices.
