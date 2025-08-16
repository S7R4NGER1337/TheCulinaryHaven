import styles from "./MenuCatagoryElement.module.css"

export default function MenuCatagoryElement(params) {
    
    return(
        <div className={styles.menuCategoryElementContainer}>
            <img src={`/${params.type}.jpg`} alt={params.type} className={styles.catagoryImage}/>
            <p className={styles.catrgoryName}>{params.type}</p>
        </div>
    )
}