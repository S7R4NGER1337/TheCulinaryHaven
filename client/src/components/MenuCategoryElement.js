import styles from "./MenuCatagoryElement.module.css"

export default function MenuCatagoryElement({onClickCategory, type}) {
    
    return(
        <div className={styles.menuCategoryElementContainer} onClick={() => onClickCategory(type)}>
            <img src={`/${type}.jpg`} alt={type} className={styles.catagoryImage}/>
            <p className={styles.catrgoryName}>{type}</p>
        </div>
    )
}