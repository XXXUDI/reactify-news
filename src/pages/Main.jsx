import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import NewsBanner from "../components/banner/banner.jsx";
import {getNews} from "../api/apiNews.js";
import NewsList from '../components/NewsList/NewsList.jsx';

const Main = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                setNews(response.news);
            } catch (err) {
                console.log('Error fetching news: ', err);
            }
        };

        fetchNews();
    }, []);


    return (
        <main className={styles.main} >
            {news.length > 0
            ? <NewsBanner item={news[0]} />
            : <div className={styles.loading}>Loading...</div>
            }
            <NewsList news={news} />
        </main>
    );
};

export default Main;