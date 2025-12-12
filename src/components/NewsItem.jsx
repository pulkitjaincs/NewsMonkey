import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useBookmarks } from '../context/BookmarksContext';

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    const { addToBookmarks, removeFromBookmarks, isBookmarked } = useBookmarks();
    const isSaved = isBookmarked(newsUrl);

    const handleBookmark = (e) => {
        e.stopPropagation();
        if (isSaved) {
            removeFromBookmarks(newsUrl);
        } else {
            addToBookmarks({ title, description, urlToImage: imgUrl, url: newsUrl, author, publishedAt: date, source });
        }
    };

    // Default image if none provided
    const fallbackImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";

    return (
        <div
            className="card h-100 border-0 shadow-sm card-hover"
            onClick={props.onReadMore}
            role="button"
            tabIndex={0}
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
        >
            {/* Image Container */}
            <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <img
                    src={imgUrl || fallbackImage}
                    className="card-img-top position-absolute top-0 start-0 w-100 h-100"
                    alt={title}
                    style={{ objectFit: 'cover' }}
                />
                <button
                    onClick={handleBookmark}
                    className="btn shadow-sm d-flex align-items-center justify-content-center"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        zIndex: 10,
                        color: isSaved ? '#dc3545' : '#6c757d'
                    }}
                >
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
            </div>

            <div className="card-body p-4 d-flex flex-column">
                {/* Meta Header */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-light text-dark border" style={{
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        background: 'transparent'
                    }}>
                        {source.name}
                    </span>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </small>
                </div>

                {/* Title */}
                <h5 className="card-title mb-3" style={{
                    color: 'var(--text-primary)',
                    fontWeight: '800',
                    fontSize: '1.1rem',
                    lineHeight: '1.4'
                }}>
                    <span className="text-decoration-none" style={{ color: 'inherit' }}>
                        {title}
                    </span>
                </h5>

                {/* Description */}
                <p className="card-text flex-grow-1 mb-4" style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}>
                    {description}
                </p>

                {/* Footer / Meta */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                    <small className="text-muted fst-italic">
                        By {author ? author.slice(0, 20) + (author.length > 20 ? '...' : '') : "Unknown"}
                    </small>
                    <span
                        className="btn btn-link text-decoration-none p-0 fw-bold"
                        style={{ color: 'var(--text-accent)', fontSize: '0.9rem', border: 'none', background: 'none' }}
                    >
                        Read More →
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
