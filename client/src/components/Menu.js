import MenuCatagoryElement from "./MenuCategoryElement"
import styles from './menu.module.css'

export default function Menu() {

    const categories = [
        'Appetizers',
        'MainCourses',
        'Deserts',
        'Drinks'
    ]

    return  <div className={styles.menuContainer}>
    <h1 className={styles.menuHeading}>Menu Catagories</h1>
    <div className={styles.categoriesContainer}>
        {categories.map(category => <MenuCatagoryElement type={category}/>)}
    </div>
    </div>
}