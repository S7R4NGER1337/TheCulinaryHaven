import { useState } from "react"
import MenuCatagoryElement from "./MenuCategoryElement"
import styles from './menu.module.css'

export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('Appetizers')
    const categories = [
        'Appetizers',
        'MainCourses',
        'Deserts',
        'Drinks'
    ]

    function onClickCategory(name) {
        setSelectedCategory(name)
    }

    return <div className={styles.menuContainer}>
        <h1 className={styles.menuHeading}>Menu Catagories</h1>
        <div className={styles.categoriesContainer}>
            {categories.map(category => <MenuCatagoryElement type={category} onClickCategory={onClickCategory} />)}
        </div>
        <p>{selectedCategory}</p>
    </div>
}