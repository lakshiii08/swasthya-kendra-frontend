<div align="center">

# 🏥 Swasthya Kendra

### AI + Blockchain Powered Smart Healthcare Ecosystem

Secure • Intelligent • Decentralized • Modern

<img src="./assets/banner.png" width="100%" />

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![Blockchain](https://img.shields.io/badge/Blockchain-Secure-purple?style=for-the-badge)

</div>

---

# 📑 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [⛓️ Blockchain Features](#️-blockchain-features)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Features](#-api-features)
- [🔒 Security Features](#-security-features)
- [🌍 Multilingual Support](#-multilingual-support)
- [🤝 Contributing](#-contributing)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [📄 License](#-license)
- [⭐ Support](#-support)

---

# ✨ Overview

**Swasthya Kendra** is a modern **AI + Blockchain powered healthcare platform** built to provide secure, scalable, and intelligent healthcare services.

The platform combines:

- 🤖 Artificial Intelligence
- ⛓️ Blockchain Technology
- 🔐 Secure Authentication
- 📄 Smart Medical Records
- 📅 Appointment Management
- 🌍 Multilingual Support

Users can securely manage healthcare records, interact with AI-powered healthcare assistance, and verify medical records using blockchain technology.

---

# 🚀 Features

## 🔐 Authentication System

- Secure User Registration & Login
- JWT Authentication
- Supabase Authentication
- Protected Routes
- Session Management
- Secure Logout Functionality

---

## 📅 Appointment Management

Users can:

- Book appointments
- Manage consultations
- View upcoming schedules
- Access appointment history

---

## 🤖 AI Healthcare Assistant

Integrated AI-powered assistant for:

- Healthcare guidance
- Medical query assistance
- Intelligent interaction
- Context-aware healthcare support

---

## ⛓️ Blockchain Medical Records

Medical records are:

- SHA256 encrypted
- Stored securely on Ethereum blockchain
- Immutable and tamper-proof
- Blockchain verified

### Includes

- Smart Contract Integration
- Transaction Verification
- Record Hash Storage
- Authenticity Validation

---

## 🌐 MetaMask Wallet Integration

- Connect MetaMask wallet
- Verify blockchain transactions
- Access decentralized features
- Ethereum wallet interaction

---

## 🌍 Multilingual Support

Supported Languages:

- English
- Hindi

Implemented using **React Context API**.

---

## 🎨 Modern UI/UX

- Responsive Design
- Mobile Friendly
- Dark/Light Mode
- Interactive Dashboard
- Smooth User Experience
- Tailwind CSS Modern Styling

---

# 🖼️ Screenshots

## 🏠 Landing Page

<p align="center">
  <img src="./assets/landing-page.png" width="100%" />
</p>

---

## 📊 Dashboard

<p align="center">
  <img src="./assets/dashboard.png" width="100%" />
</p>

---

## 🤖 AI Healthcare Assistant

<p align="center">
  <img src="./assets/ai-chat.png" width="100%" />
</p>

---

## ⛓️ Blockchain Verification

<p align="center">
  <img src="./assets/blockchain.png" width="100%" />
</p>

---

## 📅 Appointment Booking

<p align="center">
  <img src="./assets/appointments.png" width="100%" />
</p>

---

## 🌙 Dark Mode Interface

<p align="center">
  <img src="./assets/dark-mode.png" width="100%" />
</p>

---

# 🛠️ Tech Stack

## 🔹 Frontend

| Technology | Purpose |
|-----------|-----------|
| Next.js 15 | Frontend Framework |
| React.js | UI Development |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Axios | API Requests |
| Lucide React | Icons |

---

## 🔹 Backend

| Technology | Purpose |
|-----------|-----------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| TypeScript | Server Development |
| REST APIs | API Architecture |

---

## 🔹 Database & Authentication

| Technology | Purpose |
|-----------|-----------|
| Supabase | Backend Services |
| PostgreSQL | Database |
| Supabase Auth | Authentication |
| JWT | Secure Authorization |

---

## 🔹 Blockchain

| Technology | Purpose |
|-----------|-----------|
| Solidity | Smart Contracts |
| Ethereum Sepolia | Blockchain Network |
| Hardhat | Smart Contract Development |
| Ethers.js | Blockchain Interaction |
| MetaMask | Wallet Integration |

---

## 🔹 AI Integration

| Technology | Purpose |
|-----------|-----------|
| AI Assistant | Healthcare Guidance |
| Intelligent Query System | Smart Responses |

---

# ⛓️ Blockchain Features

The project includes advanced blockchain-powered healthcare verification systems.

## Smart Contract Features

- Medical Record Smart Contract
- Blockchain Hash Storage
- Record Verification System
- Ethereum Transaction Tracking

## Deployment

- Ethereum Sepolia Testnet
- MetaMask Compatible
- Smart Contract Verified

---

# 📂 Project Structure

```txt
Swasthya-Kendra/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── services/
│   └── ui/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   └── models/
│
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   └── artifacts/
│
├── assets/
├── screenshots/
│
├── README.md
└── LICENSE
```

---

# ⚙️ Installation & Setup

## 🖥️ Prerequisites

Before running the project install:

- Node.js 18+
- Git
- MetaMask Extension
- Supabase Project Setup

---

# 🔧 Frontend Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/lakshiii08/swasthya-kendra-frontend.git
```

## 2️⃣ Navigate to Frontend

```bash
cd swasthya-kendra-frontend
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Configure Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 5️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

---

# 🔧 Backend Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/lakshiii08/swasthya-kendra-backend.git
```

## 2️⃣ Navigate to Backend

```bash
cd swasthya-kendra-backend
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Configure Environment Variables

Create `.env`

```env
SUPABASE_URL=your_supabase_url

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

JWT_SECRET=your_jwt_secret

PORT=5000
```

## 5️⃣ Run Backend

```bash
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

---

# 🔑 Environment Variables

## Frontend `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Backend `.env`

```env
SUPABASE_URL=your_supabase_url

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

JWT_SECRET=your_jwt_secret

PORT=5000
```

---

# 📡 API Features

Backend APIs Include:

- Authentication APIs
- Appointment APIs
- Medical Record APIs
- Blockchain Verification APIs
- AI Assistant APIs

---

# 🔒 Security Features

- JWT Authentication
- Protected API Routes
- Blockchain Record Integrity
- Secure PostgreSQL Storage
- Environment Variable Protection
- Secure Session Handling

---

# 🌍 Multilingual Support

Supported Languages:

- English
- Hindi

More languages planned in future updates.

---

# 🤝 Contributing

We welcome contributions from developers and open-source enthusiasts.

## 📌 Contribution Steps

### 1️⃣ Fork the repository

### 2️⃣ Create a new branch

```bash
git checkout -b feature/your-feature-name
```

### 3️⃣ Make your changes

### 4️⃣ Commit changes

```bash
git commit -m "feat: add blockchain verification feature"
```

### 5️⃣ Push branch

```bash
git push origin feature/your-feature-name
```

### 6️⃣ Open a Pull Request

---

# 🗺️ Future Roadmap

## 🚀 Planned Features

- Video Consultation
- AI Prescription Generator
- QR-based Medical ID
- IPFS Medical File Storage
- Doctor/Admin Dashboards
- Real-time Notifications
- Payment Gateway Integration
- Mobile Application Support

---

# ⭐ Project Highlights

✅ AI Powered Healthcare  
✅ Blockchain Integration  
✅ Smart Contracts  
✅ MetaMask Wallet Integration  
✅ Supabase Backend  
✅ Full Stack Architecture  
✅ Multilingual Support  
✅ Responsive UI  
✅ Healthcare Domain Solution  
✅ Real-world Use Case

---

# 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.

---

# 👨‍💻 Author

### Lakshita Singh

GitHub: https://github.com/lakshiii08

---

# ⭐ Support The Project

If you found this project useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 🚀 Contribute improvements

---

<div align="center">

### Built with ❤️ using

Next.js • TypeScript • Supabase • Ethereum • Blockchain • AI

</div>
