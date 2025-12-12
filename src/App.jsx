import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarksProvider } from './context/BookmarksContext';
import SavedNews from './components/SavedNews';

const App = () => {
  const pageSize = 10;
  const apiKey = import.meta.env.VITE_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <ThemeProvider>
      <BookmarksProvider>
        <div>
          <Router>
            <LoadingBar
              color='#f11946'
              progress={progress}
            />
            <Navbar />
            <Routes>
              <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='us' category='general' />} />
              <Route exact path='/NewsMonkey' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='us' category='general' />} />
              <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='us' category='business' />} />
              <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='us' category='entertainment' />} />
              <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='us' category='technology' />} />
              <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='us' category='sports' />} />
              <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='us' category='science' />} />
              <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='us' category='health' />} />
              <Route exact path='/saved' element={<SavedNews />} />
            </Routes>
          </Router>
        </div>
      </BookmarksProvider>
    </ThemeProvider>
  )
}

export default App;
