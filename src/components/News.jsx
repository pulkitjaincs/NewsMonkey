import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import NewsModal from './NewsModal';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  const updateNews = async () => {
    props.setProgress(15);
    const cacheKey = `news-${props.country}-${props.category}-${page}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      setArticles(parsedCache.articles);
      setTotalArticles(parsedCache.totalResults);
      setLoading(false);
      props.setProgress(100);
      return;
    }

    let url;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    } else {
      url = `/api/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    }
    setLoading(true);
    setError(null);
    try {
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(65);
      if (parsedData.status === 'ok') {
        setArticles(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        sessionStorage.setItem(cacheKey, JSON.stringify(parsedData));
      } else {
        console.error("API Error:", parsedData);
        setError(parsedData.message || "An unknown error occurred");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch news. Please check your internet connection or API key.");
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  }
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const cacheKey = `news-${props.country}-${props.category}-${nextPage}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      setArticles(articles.concat(parsedCache.articles));
      setTotalArticles(parsedCache.totalResults);
      setPage(nextPage);
      return;
    }

    let url;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    } else {
      url = `/api/news?country=${props.country}&category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}`;
    }
    setPage(nextPage);
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.status === 'ok') {
      setArticles(articles.concat(parsedData.articles));
      setTotalArticles(parsedData.totalResults);
      sessionStorage.setItem(cacheKey, JSON.stringify(parsedData));
    }
  }


  return (
    <div className="container my-3">
      <h1 className="text-center fw-bold" style={{ margin: "35px 0px", marginTop: "90px", color: 'var(--text-primary)' }}>
        NewsMonkey - Top {props.category} Headlines
      </h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
        style={{ overflow: 'visible' }}
      >
        <div className="container">
          <div className="row g-5">
            {articles.map((article, index) => (
              <div className="col-md-4" key={article.url + "-" + index}>
                <NewsItem
                  title={`${article.title ? article.title.slice(0, 60) : ""}...`}
                  description={`${article.description ? article.description.slice(0, 88) : ""}...`}
                  imgUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source}
                  onReadMore={() => setSelectedArticle(article)}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      {selectedArticle && <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />}
    </div>
  )

}

export default News
