# 🗄️ QueryLab

**QueryLab** is an interactive web-based platform for learning and practicing SQL (SQLite) and MongoDB queries without any local installation. Perfect for students, developers, and anyone looking to master database querying skills.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://query-lab.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-query--lab-purple)](https://github.com/manavbansal1/query-lab)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

**🚀 [Try QueryLab Live](https://query-lab.vercel.app/)**

---

## 🔗 Quick Links

- 🌐 **Live Application:** [query-lab.vercel.app](https://query-lab.vercel.app/)
- 📦 **GitHub Repository:** [github.com/manavbansal1/query-lab](https://github.com/manavbansal1/query-lab)
- 📧 **Contact:** bansalmanav39@gmail.com
- 🐛 **Report Issues:** [GitHub Issues](https://github.com/manavbansal1/query-lab/issues)

---

## 🆕 What's New

**Latest Updates:**
- MongoDB integration with session isolation
- AI-powered error explanations with Gemini
- Automatic session cleanup (24-hour retention)
- Responsive design for mobile devices
- Monaco Editor for better code editing experience

**Coming Soon:**
- 📚 Comprehensive documentation
- 🗄️ Database overview pages
- 🎯 Interactive tutorials
- 📊 Query performance metrics

---

![QueryLab Screenshot](https://via.placeholder.com/800x400?text=QueryLab+Screenshot)

---

## 📸 Screenshots

### Query Interface
![Query Interface](./public/homePage.png)

### Schema Visualization
![Schema View](./public/schema.png)

### AI-Powered Help
![AI Help](/public/ai-response.png)

---

## ✨ Features

### 🎓 **Educational Focus**
- **Zero Installation Required** - Practice SQL and MongoDB directly in your browser
- **Sample Databases** - Pre-loaded datasets for Users & Orders, Blog, and E-commerce scenarios
- **Isolated Sessions** - Each user gets their own isolated database environment
- **Real-Time Execution** - See query results instantly
- **Schema Visualization** - View database structure before writing queries

### 💾 **Dual Database Support**
- **SQL (SQLite)** - Runs entirely in the browser using sql.js
- **MongoDB** - Cloud-based with session isolation for multi-user support

### 🤖 **AI-Powered Help**
- **Gemini Integration** - Get intelligent explanations for query errors
- **Error Analysis** - Understand what went wrong and how to fix it
- **Learning Assistant** - Helps students debug and improve their queries

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Code Editor** - Syntax highlighting with Monaco Editor
- **Clean Interface** - Intuitive navigation and clear result display

### 🔄 **Data Management**
- **Auto-Cleanup** - Old sessions automatically deleted after 24 hours
- **Session Persistence** - Your data persists across page refreshes
- **Reset Option** - Start fresh with new sample data anytime
- **Custom Mode** - Create your own tables and collections

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (free tier)
- (Optional) Gemini API key for AI help feature

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manavbansal1/query-lab.git
   cd query-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Atlas Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   
   # Gemini AI (Optional)
   GEMINI_API_KEY=your_gemini_api_key
   
   # EmailJS (Optional - for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Free Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### Step 2: Create Cluster
1. Click "Build a Database"
2. Select **FREE** M0 tier
3. Choose **AWS** and nearest region
4. Click "Create"

### Step 3: Configure Access
1. **Database Access:**
   - Add new database user
   - Username: `querylab_user`
   - Generate secure password (save it!)
   - Role: "Read and write to any database"

2. **Network Access:**
   - Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your actual password
5. Add to `.env.local`

---

## 📦 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Monaco Editor** - Code editor with syntax highlighting
- **Bootstrap 5** - Responsive UI components
- **React Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB Node Driver** - Database connectivity
- **sql.js** - SQLite in the browser

### AI & Services
- **Google Gemini** - AI-powered error explanations
- **EmailJS** - Contact form service

### Database
- **MongoDB Atlas** - Cloud MongoDB (free tier)
- **SQLite (sql.js)** - Client-side SQL database

---

## 📁 Project Structure

```
querylab/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── mongodb-query/
│   │   │   │   └── route.js          # MongoDB query execution
│   │   │   ├── cleanup-sessions/
│   │   │   │   └── route.js          # Auto-cleanup old sessions
│   │   │   └── ask-gemini/
│   │   │       └── route.js          # AI help integration
│   │   ├── about/
│   │   ├── databases/
│   │   ├── documentation/
│   │   ├── layout.js
│   │   ├── page.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── docs/
│   │   │   ├── CollapsibleSection.jsx
│   │   │   ├── Examples.jsx
│   │   │   ├── GettingStarted.jsx
│   │   │   ├── MongoDBGuide.jsx
│   │   │   ├── SQLGuide.jsx
│   │   │   └── TipsAndTricks.jsx
│   │   ├── ClientLayout.jsx          # Client-side wrapper
│   │   ├── Contact.jsx               # Contact modal
│   │   ├── Navbar.jsx                # Navigation bar
│   │   └── QueryTab.jsx              # Main query interface
│   ├── data/
│   │   └── SampleQueries.js          # Sample queries & data
│   ├── lib/
│   │   └── sqlite-manager.js         # SQLite helper functions
│   └── styles/
│       ├── Contact.css
│       ├── Navbar.css
│       └── QueryTab.css
├── public/
├── .env.local                         # Environment variables (create this)
├── .gitignore
├── vercel.json                        # Vercel cron config
├── package.json
├── next.config.js
├── LICENSE
└── README.md
```

---

## 🎮 Usage Guide

### SQL Mode

1. **Select Database Type**: Choose from Users & Orders, Blog, E-commerce, or Custom
2. **View Schema**: Click "Show" to see table structure
3. **Write Query**: Use the Monaco editor with syntax highlighting
4. **Execute**: Click "Execute Query" or press the play button
5. **View Results**: See results in a formatted table

**Example SQL Queries:**
```sql
-- Find all users
SELECT * FROM users;

-- Join users with orders
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- Filter by condition
SELECT * FROM orders WHERE amount > 100;
```

### MongoDB Mode

1. **Select Database Type**: Choose from Users & Orders, Blog, E-commerce, or Custom
2. **View Schema**: Click "Show" to see collection structure
3. **Write Query**: Use MongoDB query syntax
4. **Execute**: Click "Execute Query"
5. **View Results**: See results in JSON format

**Example MongoDB Queries:**
```javascript
// Find all users
db.users.find()

// Find with filter
db.orders.find({ amount: { $gt: 100 } })

// Sort and limit
db.posts.find().sort({ views: -1 })

// Count documents
db.users.countDocuments()
```

### AI Help Feature

1. Execute a query with an error
2. Click "Ask Gemini for Help"
3. Get AI-powered explanation and fix suggestions
4. Learn from the mistakes

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `MONGODB_URI` (and optionally `GEMINI_API_KEY`)
   - Check: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Automatic Session Cleanup

The app automatically cleans up sessions older than 24 hours using Vercel Cron Jobs (configured in `vercel.json`):
- Runs daily at 3 AM UTC
- Deletes old session collections
- Keeps MongoDB storage under control

---

## 🎯 Use Cases

### For Students
- Learn SQL and MongoDB syntax
- Practice queries without installation
- Get immediate feedback on errors
- Experiment safely with isolated data

### For Educators
- Provide hands-on database exercises
- No setup required for students
- Track common query mistakes
- Share live examples during lectures

### For Developers
- Quick SQL/MongoDB testing
- Prototype queries before production
- Compare SQL vs MongoDB syntax
- Refresh database skills

---

## 🤝 Contributing

QueryLab is a solo passion project, but contributions are welcome! Whether it's bug reports, feature suggestions, or code contributions, I appreciate all help.

### How to Contribute:

1. Fork the repository: [github.com/manavbansal1/query-lab](https://github.com/manavbansal1/query-lab)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ways to Help:
- 🐛 Report bugs you encounter
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🎨 Enhance UI/UX design
- 🧪 Write tests
- 🌐 Add translations

Every contribution, no matter how small, is valued! 🙏

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **sql.js** - SQLite compiled to JavaScript
- **MongoDB Atlas** - Free cloud MongoDB hosting
- **Google Gemini** - AI-powered help
- **Next.js** - Amazing React framework
- **Vercel** - Seamless deployment platform

---

## 💜 About the Creator

QueryLab is built and maintained by **Manav Bansal**, a solo developer passionate about making database education accessible to everyone. This is a passion project created in my free time to help students and developers learn databases without installation barriers.

If QueryLab has helped you, please consider:
- ⭐ **Starring the repository** on GitHub
- 📢 **Sharing** it with friends and colleagues
- 🐛 **Reporting bugs** or suggesting features
- 💬 **Spreading the word** on social media

Your support and feedback drive this project forward! 🙏

---

## 📧 Contact

**Manav Bansal** - Developer & Creator

- 📧 Email: bansalmanav39@gmail.com
- 🐙 GitHub: [@manavbansal1](https://github.com/manavbansal1)
- 🌐 Live Site: [query-lab.vercel.app](https://query-lab.vercel.app/)

**Project Repository:** [github.com/manavbansal1/query-lab](https://github.com/manavbansal1/query-lab)

---

## 🌟 Support the Project

If you find QueryLab helpful, please consider:

- ⭐ **[Star the repository](https://github.com/manavbansal1/query-lab)** on GitHub
- 🐛 **[Report bugs](https://github.com/manavbansal1/query-lab/issues)** you encounter
- 💡 **[Suggest features](https://github.com/manavbansal1/query-lab/issues)** you'd like to see
- 📢 **Share** QueryLab with friends, colleagues, and students
- 💬 **Spread the word** on social media

Your support helps QueryLab grow and improve! 🙏

---

**Made with 💜 by [Manav Bansal](https://github.com/manavbansal1) for students learning databases**
