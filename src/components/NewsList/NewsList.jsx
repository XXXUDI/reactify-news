import NewsItem from '../NewsItem/NewsItem';
import styles from './styles.module.css'
import withSkeleton from '../../util/hocs/withSkeleton.jsx'

const NewsList = ({news}) => {
    return (
        <ul className={styles.list}>
            {news.map(item => {
                return <NewsItem key={item.id} item={item} />
            })}
        </ul>
    );
};

const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10);

export default NewsListWithSkeleton;