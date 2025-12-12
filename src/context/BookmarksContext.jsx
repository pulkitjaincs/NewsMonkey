import React, { createContext, useState, useEffect, useContext } from 'react';

const BookmarksContext = createContext();

export const useBookmarks = () => {
    return useContext(BookmarksContext);
};

export const BookmarksProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('newsapp_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('newsapp_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addToBookmarks = (article) => {
        setBookmarks((prev) => {
            if (!prev.some(item => item.url === article.url)) {
                return [...prev, article];
            }
            return prev;
        });
    };

    const removeFromBookmarks = (url) => {
        setBookmarks((prev) => prev.filter(item => item.url !== url));
    };

    const isBookmarked = (url) => {
        return bookmarks.some(item => item.url === url);
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, addToBookmarks, removeFromBookmarks, isBookmarked }}>
            {children}
        </BookmarksContext.Provider>
    );
};
