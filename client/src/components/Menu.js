import { useEffect, useState } from "react"
import MenuCatagoryElement from "./MenuCategoryElement"
import styles from './menu.module.css'
import ProductCard from "./ProductCard"

export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('Appetizers')
    const [products, setProducts] = useState([])

    useEffect(() => {
        try {
            async function getProducts() {

                const response = await fetch(`http://localhost:3030/products/category/${selectedCategory}`)
                const products = await response.json()

                console.log(products);
                setProducts(products);
            }
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }, [selectedCategory])

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
        <h1 className={styles.selectedCategoryName}>{selectedCategory}</h1>
        <div className={styles.productsContainer}>
            {products.map(((product) => (
                <ProductCard key={product.id} productData={product} />
            )))}
        </div>
    </div>
}