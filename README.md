# 🍽️ Food Menu - Full-Stack Application

Food Menu is a modern, fast, and fully responsive full-stack application built with **Next.js 16**. It provides a premium experience for users to browse food items while giving administrators a secure dashboard to manage menu items in real time. Built with the **Next.js App Router**, the application combines Server Components, Client Components, API Routes, and secure authentication for optimal performance.

🌐 **Live Demo:** https://next-js-client-side-lime.vercel.app/

---

# 📸 Preview

![Food Menu Screenshot](https://via.placeholder.com/1200x650.png?text=Food+Menu+Project)

---

# ✨ Features

- 🔐 Secure authentication with **NextAuth.js**
- 📧 Email & Password Login
- 🔑 Google OAuth Login
- 👤 Role-based Admin Dashboard
- ➕ Add new food items
- ✏️ Update existing menu items
- ❌ Delete menu items
- 📋 View complete food inventory
- 🔍 Dynamic food details pages
- ⚡ Server-side rendering with Next.js App Router
- 📱 Fully responsive design
- 🎨 Styled using Tailwind CSS
- 🗄️ MongoDB database integration
- 🔒 Protected API Routes
- 🚀 Optimized deployment on Vercel

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS

## Backend

- Next.js API Routes
- Server Actions

## Authentication

- NextAuth.js
- Google OAuth
- JWT Sessions

## Database

- MongoDB
- Mongoose

## Deployment

- Vercel

---

# 📦 Dependencies

```json
{
  "next": "^16.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "next-auth": "^4.x",
  "mongodb": "^6.x",
  "mongoose": "^8.x"
}
```

---

# 📁 Project Structure

```
food-menu-nextjs/
│
├── app/
├── components/
├── lib/
├── models/
├── public/
├── styles/
├── middleware.js
├── .env.local
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/rimi-1234/food-menu-nextjs.git
```

Move into the project directory:

```bash
cd food-menu-nextjs
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Or Yarn:

```bash
yarn install
```

Or pnpm:

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a file named **.env.local** in the root directory.

```env
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 4. Start the Development Server

```bash
npm run dev
```

Now open:

```
http://localhost:3000
```

---

# 🚀 Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🧑‍💻 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm start
```

Runs the production server.

```bash
npm run lint
```

Runs ESLint.

---

# 🔐 Authentication

The project uses **NextAuth.js** for authentication.

Supported providers:

- Email & Password
- Google OAuth

Authenticated users receive secure session management using JWT/session cookies.

---

# 👨‍💼 Admin Dashboard

The admin panel allows administrators to:

- Add Food Items
- Edit Food Items
- Delete Food Items
- Manage Inventory
- Access Protected Routes

---

# 🗄️ Database

MongoDB is used as the primary database.

Mongoose provides:

- Schema Validation
- Data Modeling
- Query Management

---

# 🌍 Deployment

This project is optimized for deployment on **Vercel**.

Deploy using:

```bash
vercel
```

Or connect the GitHub repository directly from the Vercel dashboard.


---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Rimi**

GitHub:
https://github.com/rimi-1234

---

# 🌐 Live Demo

https://next-js-client-side-lime.vercel.app/
