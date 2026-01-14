# TaskCF – React Quiz Application 🧠⚡

TaskCF is a modern, interactive **Quiz Application built with React**.  
It allows users to attempt timed quizzes, navigate between questions, and view detailed results at the end.

This project is structured using reusable components and follows clean frontend practices.

## 🚀 Features

- ⏱️ **Countdown Timer** for quiz sessions  
- 🧭 **Question Navigation** (Next / Previous / Jump to question)
- 📊 **Result Analysis**
  - Score calculation
  - Correct vs Incorrect answers
- 📴 **Offline Detection**
- 🔄 **Loader & Error Handling**
- 🎨 **Clean UI with modular CSS**
- 📦 **Reusable React Components**
- 🧪 **Storybook integration for components**
- 📱 **Responsive Design**

## 🛠️ Tech Stack

- **Frontend:** React (JavaScript)
- **Styling:** CSS
- **State Management:** React Hooks
- **Tooling:**
  - npm
  - Storybook
- **Build Tool:** Create React App

## 📁 Project Structure
quiz-app/
│── public/
│── src/
│ ├── components/
│ │ ├── Quiz/
│ │ ├── QuestionNavigator/
│ │ ├── Countdown/
│ │ ├── Result/
│ │ ├── Header/
│ │ └── Loader/
│ ├── constants/
│ ├── utils/
│ ├── images/
│ ├── index.js
│ └── index.css
│── package.json
│── README.md

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or above recommended)
- **npm** (comes with Node.js)

Check versions:
```bash
node -v
npm -v

## ▶️ How to Run the Project Locally

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Raghu1124/TaskCF.git

2️⃣ Navigate to the project directory
cd TaskCF

3️⃣ Install dependencies
npm install

4️⃣ Start the development server
npm start

5️⃣ Open in browser

Once the server starts, open:

http://localhost:3000