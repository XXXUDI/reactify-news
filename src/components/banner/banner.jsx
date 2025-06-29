import React from 'react';
import {formatTimeAgo} from "../../util/formatTimeAgo.js";
import styles from "./styles.module.css";
import Image from "../image/image.jsx";
import withSkeleton from '../../util/hocs/withSkeleton.jsx';

const NewsBanner = ({item}) => {
    return (
        <div className={styles.banner}>
            <Image image={item?.image} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.extra}>{formatTimeAgo(item.published)} by {item.author}</p>
        </div>
    );
};

const NewsBannerWithSkeleton = withSkeleton(NewsBanner, 'banner', 1);

export default NewsBannerWithSkeleton;