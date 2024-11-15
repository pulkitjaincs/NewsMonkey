import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  News.defaultProps = {
    country: 'in',
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
    const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(65);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.total);
    setLoading(false);
    props.setProgress(100);
  }
  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // }
  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // }
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;
    updateNews();
  }, []);
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.total);
    setLoading(false);
  }


  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey - Top {props.category} Headlines
      </h1>
      {loading && <Spinner />}
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
                <NewsItem
                  title={`${article.title ? article.title.slice(0, 45) : ""}...`}
                  description={`${article.description ? article.description.slice(0, 88) : ""}...`}
                  imgUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between my-4'>
          <button disabled={page < 2} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr;Previous</button>
          <button disable={ + 1 > Math.ceil(.totalArticles / propspageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next&rarr;</button>
        </div> */}
    </div>
  )

}

export default News
