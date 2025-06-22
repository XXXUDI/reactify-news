import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import NewsBanner from "../components/banner/banner.jsx";
import {getNews} from "../api/apiNews.js";
import NewsList from '../components/NewsList/NewsList.jsx';
import Skeleton from '../components/Skeleton/Skeleton.jsx';

const Main = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                setNews(response.news);
            } catch (err) {
                console.log('Error fetching news: ', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    if(isLoading) {
        console.log("Loading posts...");
    }

    return (
        <main className={styles.main} >
            {news.length > 0 && !isLoading
            ? <NewsBanner item={news[0]} />
            : <Skeleton count={1} type='banner' />
            }
            {!isLoading 
            ? <NewsList news={news}/>
            : <Skeleton count={10} type='item'/>
            }
        </main>
    );
};

export default Main;