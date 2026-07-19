# 🍽️ Food Menu - Full-Stack Application

Food Menu is a modern, fast, and fully responsive full-stack application built with **Next.js 16**. The platform delivers a premium browsing experience for food lovers while offering a powerful, secure backend dashboard for administrators to manage inventory in real-time. By leveraging server-side rendering alongside optimized client components, it provides instant loading states and seamless user transitions.

🌐 **Live Website:** [https://next-js-client-side-lime.vercel.app/](https://next-js-client-side-lime.vercel.app/)

---

## 📸 Preview
![Food Menu Banner or Screenshot](https://via.placeholder.com/800x450.png?text=Food+Menu+Project+Screenshot)


---

## 🚀 Key Features

- **Secure Authentication:** Integrated **NextAuth** supporting secure Email/Password registration and login, alongside streamlined **Google OAuth** social login.
- **Admin Role-Based Dashboard:** Dedicated admin-protected routes and view guards preventing unauthorized access to sensitive application states.
- **Full Inventory CRUD:** Authorized admins can seamlessly add new culinary items, update titles/prices/descriptions via prefilled forms, and delete products directly from the UI.
- **Dynamic Routing:** Built utilizing Next.js dynamic routing infrastructure to generate fast, search-optimized product details pages on-the-fly.
- **Hybrid Rendering Architecture:** A polished combination of Next.js Server Components for lightning-fast initial data fetching and Client Components for snappy interactive elements.
- **Robust API Infrastructure:** Custom built Next.js API endpoints handling database transactions, security validations, and CRUD operations efficiently.

---

## ⚙️ Technologies Used

### Frontend & Backend Framework
- **Core Framework:** Next.js 16 (App Router, Server Actions, API Routes)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS

### Database & Security
- **Database:** MongoDB
- **ODM Layer:** Mongoose
- **Session Security:** JSON Web Tokens (JWT) / NextAuth Session Cookies

### Hosting & Deployment
- **Platform:** Vercel (Optimized Serverless Deployment for Frontend & API Routes)

---

## 📦 Project Dependencies

### Key Application Dependencies
```json
{
  "next": "^16.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "next-auth": "^4.x",
  "mongodb": "^6.x",
  "mongoose": "^8.x"
}

## 📦 Setup & Installation

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/rimi-1234/next-food-menu-client
cd https://github.com/rimi-1234/next-food-menu-client

---

### For Food Menu (Next.js 16 Stack)
```markdown
## 🛠️ Local Installation & Setup Guide

Follow these steps to set up the project locally on your machine:

### Prerequisites
- Node.js (v18.x or higher) and npm installed.
- A running MongoDB Atlas cluster.
- Google OAuth credentials from the Google Developer Console.

### Step 1: Clone the Repository
```bash
git clone [https://github.com/your-username/food-menu-nextjs.git](https://github.com/rimi-1234/food-menu-nextjs.git)
cd food-menu-nextjs
Step 2: Install Dependencies
Bash
npm install
Step 3: Environment Variables Setup (.env.local)
Create a .env.local file in the root directory:

Code snippet
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/food_menu_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Step 4: Run Locally
Bash
npm run dev
