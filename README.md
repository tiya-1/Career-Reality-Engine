# 🚀 Career Reality Engine

An AI-powered career guidance platform that helps students discover suitable career paths, generate personalized learning roadmaps, assess their skills, and track their progress.

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

### 🧠 Career Analysis
- Personalized career recommendations
- Multiple interest selection
- Domain-based filtering
- Risk analysis for every career
- AI mentorship suggestions

### 🗺 Personalized Roadmap
- AI-generated learning roadmap
- Weekly milestones
- Progress tracking
- Consistency score
- Career-specific roadmap generation

### 🎯 Skill Assessment
- AI-generated MCQ tests
- Career-specific questions
- Automatic evaluation
- Score calculation
- Instant feedback

### 📚 RAG (Retrieval Augmented Generation)
- Uses career-specific context
- Better roadmap generation
- More relevant skill assessments

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- CSS3
- Fetch API
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas
- Mongoose

### AI
- Groq API
- Llama 3.3 70B
- Retrieval Augmented Generation (RAG)

---

## 📂 Project Structure

```
Career-Reality-Engine/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   └── app/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── styles/
│       └── package.json
│
└── docker-compose.yml
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/tiya-1/Career-Reality-Engine.git
```

```
cd Career-Reality-Engine
```

---

## Backend Setup

```
cd backend
npm install
```

Create a `.env`

```
PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key
```

Run backend

```
npm start
```

or

```
npm run dev
```

---

## Frontend Setup

```
cd frontend/app
npm install
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

## 🧩 Main Modules

- Authentication
- Career Recommendation Engine
- AI Roadmap Generator
- Progress Tracker
- Skill Test Generator
- RAG Context Retrieval

---

## 📸 Screenshots

<img width="1887" height="846" alt="image" src="https://github.com/user-attachments/assets/0522805f-1593-4d8e-9074-12c32efa85f6" />
<img width="1895" height="846" alt="image" src="https://github.com/user-attachments/assets/4426c855-fdbd-4d27-b90e-cf2118f87661" />
<img width="1797" height="847" alt="image" src="https://github.com/user-attachments/assets/20f071c9-58d7-4042-96b3-db15c5400ad0" />
<img width="1886" height="852" alt="image" src="https://github.com/user-attachments/assets/196acba2-1dfd-431d-a5ff-5474dd3ce522" />
<img width="1677" height="861" alt="image" src="https://github.com/user-attachments/assets/e38c8870-95ad-48ff-8373-beb5abd78fd1" />
<img width="1842" height="852" alt="image" src="https://github.com/user-attachments/assets/04feb8e4-1aab-41f2-9844-f7f0ba4f6753" />
<img width="1772" height="802" alt="image" src="https://github.com/user-attachments/assets/ecfe41cb-736f-4576-92b2-3c92d55788fd" />
<img width="1822" height="872" alt="image" src="https://github.com/user-attachments/assets/9b68c780-02c3-4552-8ea1-c6bf404d416a" />
<img width="1692" height="870" alt="image" src="https://github.com/user-attachments/assets/65a087aa-2473-46df-8b78-9efcd51060c2" />



---

## 🔮 Future Improvements

- Resume Builder
- AI Career Chatbot
- Interview Preparation
- Mock Interviews
- Job Recommendation Engine
- College Recommendation
- Analytics Dashboard

---


## 📜 License

This project is developed for educational and portfolio purposes.
