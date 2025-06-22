import React from 'react'
import style from './style.module.css';

function Details(item) {
    item = item.details;

    return (
        <div className={style.detailsContainer}>
            <div className={style.detailItem}>
                <span className={style.detailLabel}>סוג:</span>
                <span className={style.detailText}>{item.type}</span>
            </div>
            <div className={style.detailItem}>
                <span className={style.detailLabel}>זמן הכנה:</span>
                <span className={style.detailText}>{item.time}</span>
            </div>
            <div className={style.detailItem}>
                <span className={style.detailLabel}>רמת קושי:</span>
                <span className={style.detailText}>{item.level}</span>
            </div>
            {item.servings && (
                <div className={style.detailItem}>
                    <span className={style.detailLabel}>מספר מנות:</span>
                    <span className={style.detailText}>{item.servings}</span>
                </div>
            )}
        </div>
    )
}

export default Details;