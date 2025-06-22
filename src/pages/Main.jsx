import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import NewsBanner from "../components/banner/banner.jsx";
import {getNews} from "../api/apiNews.js";
import NewsList from '../components/NewsList/NewsList.jsx';
import Skeleton from '../components/Skeleton/Skeleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';

const Main = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPages, ) => {
            try {
                const response = await getNews(currentPages, pageSize);
                setNews(response.news);
            } catch (err) {
                console.log('Error fetching news: ', err);
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {

        fetchNews(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1);
        }
    }

    const handlePreviousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage -1);
        } else {
            setCurrentPage(10);
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    if(isLoading) {
        console.log("Loading posts...");
    }

    return (
        <main className={styles.main} >
            {news.length > 0 && !isLoading
            ? <NewsBanner item={news[0]} />
            : <Skeleton count={1} type='banner' />
            }
            <Pagination 
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handlePageClick={handlePageClick}
            currentPage={currentPage} />
            {!isLoading 
            ? <NewsList news={news}/>
            : <Skeleton count={10} type='item'/>
            }
            <Pagination
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                currentPage={currentPage} />
        </main>
    );
};

export default Main;