import styles from "./MenuCatagoryElement.module.css"

export default function MenuCatagoryElement({onClickCategory, type, selectedCategory}) {
    
    const isSelected = type === selectedCategory
    
    return(
        <div className={styles.menuCategoryElementContainer} onClick={() => onClickCategory(type)}>
            <img src={`/${type}.jpg`} alt={type} className={styles.catagoryImage}/>
            <p className={styles.catrgoryName}>{type}</p>
            {isSelected ? <div className={styles.line}></div>: <></>}
        </div>
    )
}