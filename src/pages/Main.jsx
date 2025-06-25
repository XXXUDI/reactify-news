import styles from './styles.module.css';
import NewsBanner from "../components/banner/banner.jsx";
import {getCategories, getNews} from "../api/apiNews.js";
import NewsList from '../components/NewsList/NewsList.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import Categories from '../components/Categories/Categories.jsx';
import Search from '../components/Search/Search.jsx';
import { useDebounce } from '../util/hook/useDebounce.js';
import { PAGE_SIZE, TOTAL_PAGES } from '../constant/constatnt.js';
import { useFetch } from '../util/hook/useFetch.js';
import { useFilters } from '../util/hook/useFilters.js';

const Main = () => {

    const {filters, changeFilters} = useFilters({
        page_number: 1,
        page_size: PAGE_SIZE,
        category: null,
        keywords: ''
    });

    const {data: dataCategories} = useFetch(getCategories);
    const debouncedKeywords=useDebounce(filters.keywords, 1500);

    const {data, isLoading} = useFetch(getNews, {
        ...filters,
        keywords: debouncedKeywords
    });

    const handleNextPage = () => {
        if(filters.page_number < TOTAL_PAGES) {
            changeFilters('page_number', filters.page_number + 1);
        } else {
            changeFilters('page_number', 1);
        }
    }

    const handlePreviousPage = () => {
        if(filters.page_number > 1) {
            changeFilters('page_number', filters.page_number -1);
        } else {
            changeFilters('page_number', 10);
        }
    }

    const handlePageClick = (pageNumber) => {
        changeFilters('page_number', pageNumber);
    }

    return (
        <main className={styles.main} >
            {dataCategories ? (
                <Categories
            categories={dataCategories.categories}
            setSelectedCategory={(category) => changeFilters('category', category)}
            selectedCategory={filters.category}
            />
            ) : (
                null
            )}
            
            
            <Search keywords={filters.keywords} setKeywords={(keywords) => changeFilters('keywords', keywords)}/>

            <NewsBanner
            isLoading={isLoading} 
            item={data && data.news && data.news[0]} 
            />

            <Pagination 
            totalPages={TOTAL_PAGES}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handlePageClick={handlePageClick}
            currentPage={filters.page_number} />

            <NewsList isLoading={isLoading} news={data?.news || []} />

            <Pagination
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number} />
        </main>
    );
};

export default Main;