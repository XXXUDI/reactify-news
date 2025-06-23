import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import NewsBanner from "../components/banner/banner.jsx";
import {getCategories, getNews} from "../api/apiNews.js";
import NewsList from '../components/NewsList/NewsList.jsx';
import Skeleton from '../components/Skeleton/Skeleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import Categories from '../components/Categories/Categories.jsx';

const Main = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPages) => {
            try {
                const response = await getNews({
                    page_number: currentPage,
                    page_size: pageSize,
                    category: selectedCategory === "All" ? null : selectedCategory
                });
                setNews(response.news);
            } catch (err) {
                console.log('Error fetching news: ', err);
            } finally {
                setIsLoading(false);
            }
        };

    const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(["All", ...response.categories]);
            } catch (err) {
                console.log('Error fetching news: ', err);
            }
        };
    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, selectedCategory]);

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
            <Categories
            categories={categories}
            setSelectedCategory={setSelectedCategory}
             selectedCategory={selectedCategory} />
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