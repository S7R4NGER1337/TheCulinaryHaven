import { useEffect, useState } from "react"
import MenuCatagoryElement from "./MenuCategoryElement"
import styles from './menu.module.css'
import ProductCard from "./ProductCard"

const API_URL = process.env.REACT_APP_API_URL

export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('Appetizers')
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(`${API_URL}/products/category/${selectedCategory}`)
                if (!response.ok) return
                const products = await response.json()
                setProducts(products);
            } catch (error) {
                setProducts([])
            }
        }
        getProducts()
    }, [selectedCategory])

    const categories = [
        'Appetizers',
        'MainCourses',
        'Desserts',
        'Drinks'
    ]

    function onClickCategory(name) {
        setSelectedCategory(name)
    }

    return <div className={styles.menuContainer}>
        <h1 className={styles.menuHeading}>Menu Catagories</h1>
        <div className={styles.categoriesContainer}>
            {categories.map(category => <MenuCatagoryElement type={category} onClickCategory={onClickCategory} selectedCategory={selectedCategory}/>)}
        </div>
        <h1 className={styles.selectedCategoryName}>{selectedCategory}</h1>
        <div className={styles.productsContainer}>
            {products.map(((product) => (
                <ProductCard key={product._id} productData={product} />
            )))}
        </div>
    </div>
}