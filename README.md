# 📰 NewsMonkey

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![NewsAPI](https://img.shields.io/badge/API-NewsAPI-FF6B6B?style=for-the-badge)](https://newsapi.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pulkirjaincs.github.io/NewsMonkey)

> A modern, responsive news aggregation application built with React. Features infinite scroll, real-time loading indicators, and category-based news browsing.

## 🌐 Live Demo

**[🚀 View Live Application](https://pulkirjaincs.github.io/NewsMonkey)**

## 📸 Screenshots

| Desktop View | Mobile View |
|--------------|-------------|
| ![Desktop](https://via.placeholder.com/600x400/007bff/ffffff?text=Desktop+View) | ![Mobile](https://via.placeholder.com/300x400/28a745/ffffff?text=Mobile+View) |

## ✨ Key Features

- **📱 Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **🔄 Infinite Scroll**: Smooth infinite scrolling for seamless news browsing
- **⚡ Smart Caching**: Session-based caching to minimize API calls and ensure instant navigation
- **🔖 Bookmarks**: "Read Later" functionality with persistent storage for your favorite articles
- **🔗 Social Sharing**: Native sharing integration to easily share articles via WhatsApp, Twitter, etc.
- **🌗 Dark Mode**: Premium dark mode support with system preference detection
- **📂 Category Navigation**: Browse news by categories (Business, Technology, Sports, Science, Health, Entertainment)
- **🌍 Multi-country Support**: Currently configured for Indian news with easy country switching
- **🎨 Modern Premium UI**: Glassmorphism aesthetics, smooth animations, and polished typography
- **📊 Progress Tracking**: Visual progress indicators during data fetching

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18.2.0 |
| **Routing** | React Router DOM 6.22.3 |
| **Styling** | Bootstrap 5.0 |
| **API** | NewsAPI.org |
| **Infinite Scroll** | react-infinite-scroll-component |
| **Loading UI** | react-top-loading-bar |
| **Deployment** | GitHub Pages |
| **Package Manager** | npm |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- NewsAPI key ([Get free API key](https://newsapi.org/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/newsapp.git
cd newsapp

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_NEWS_API=your_api_key_here" > .env

# Start development server
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run deploy` | Deploys to GitHub Pages |

## 📁 Project Structure

```
newsapp/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation with category dropdown
│   │   ├── News.js            # Main news component with infinite scroll
│   │   ├── NewsItem.js        # Individual news card component
│   │   └── Spinner.js         # Loading spinner component
│   ├── App.js                 # Main app component with routing
│   ├── App.css               # Application styles
│   ├── index.js              # Application entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🎯 Core Components

### 📰 News Component
```javascript
// Main news component with infinite scroll
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Handles API calls to NewsAPI
  // Implements infinite scroll functionality
  // Manages loading states and progress tracking
}
```

### 📄 NewsItem Component
```javascript
// Individual news card component
const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date } = props;
  
  // Displays articles in Bootstrap card format
  // Handles missing images with fallback
  // Formats publication dates
}
```

### 🧭 Navbar Component
```javascript
// Responsive navigation component
const Navbar = () => {
  // Bootstrap-powered navigation
  // Category dropdown for easy navigation
  // Fixed positioning for better UX
}
```

## ⚙️ Configuration

### Environment Variables
```env
REACT_APP_NEWS_API=your_newsapi_key_here
```

### App Configuration
```javascript
// In App.js
const pageSize = 10;           // Articles per page
const country = 'in';          // Country code (in, us, gb, etc.)
const category = 'general';    // News category
```

### Available Categories
- `general` - General news
- `business` - Business news  
- `entertainment` - Entertainment news
- `health` - Health news
- `science` - Science news
- `sports` - Sports news
- `technology` - Technology news

## 🌟 Key Features Implementation

### 🔄 Infinite Scroll
```javascript
<InfiniteScroll
  dataLength={articles.length}
  next={fetchMoreData}
  hasMore={articles.length !== totalArticles}
  loader={<Spinner />}
>
  <div className="container">
    <div className="row">
      {articles.map((article, index) => (
        <div className="col-md-4" key={article.url + "-" + index}>
          <NewsItem {...article} />
        </div>
      ))}
    </div>
  </div>
</InfiniteScroll>
```

### 📊 Progress Tracking
```javascript
const updateNews = async () => {
  props.setProgress(15);  // API call start
  const data = await fetch(url);
  props.setProgress(30);  // Data received
  const parsedData = await data.json();
  props.setProgress(65);  // Processing
  setArticles(parsedData.articles);
  props.setProgress(100); // Complete
}
```

### 🎨 Responsive Design
```javascript
// Bootstrap responsive grid
<div className="col-md-4">  // Desktop: 3 columns
<div className="col-sm-6">   // Tablet: 2 columns  
<div className="col-12">     // Mobile: 1 column
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
The easiest way to deploy is using Vercel:

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your repository. Vercel will automatically detect Vite/React.
4. Click **Deploy**.

*Note: A `vercel.json` file is included to handle client-side routing.*

### GitHub Pages Deployment
1. Update `homepage` in `package.json`.
2. Run deployment script:
```bash
npm run deploy
```

## 📈 Performance Optimizations

| Optimization | Implementation |
|-------------|----------------|
| **Lazy Loading** | Images load as needed with fallbacks |
| **State Management** | Minimal re-renders with proper state handling |
| **API Optimization** | Paginated requests to reduce load times |
| **Responsive Images** | Optimized image handling with fallbacks |
| **Code Splitting** | React Router for efficient bundle splitting |

## 🔮 Roadmap

- [ ] 🔍 Search functionality
- [x] 🌙 Dark mode toggle
- [x] 📌 Bookmark/save articles
- [x] ⚡ Smart Caching
- [x] 🔗 Social Sharing
- [ ] ⚙️ User preferences
- [ ] 🔔 Push notifications
- [ ] 📱 Offline support with PWA
- [ ] 🌍 Multi-language support
- [ ] 📊 Analytics dashboard

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Quick Start for Contributors
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/newsapp.git
cd newsapp

# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add: your feature description"

# Push and create a Pull Request
git push origin feature/your-feature-name
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- 🌐 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- 📧 Email: your.email@example.com

---

<div align="center">

⭐ **Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/newsapp?style=social)](https://github.com/yourusername/newsapp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/newsapp?style=social)](https://github.com/yourusername/newsapp/network/members)

*Built with ❤️ using React*

</div>
