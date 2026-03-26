import { useEffect, useState } from "react"
import MenuCatagoryElement from "./MenuCategoryElement"
import styles from './menu.module.css'
import ProductCard from "./ProductCard"
import API_URL from '../api'

export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('Appetizers')
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        async function getProducts() {
            setError(false)
            try {
                const response = await fetch(`${API_URL}/products/category/${selectedCategory}`)
                if (!response.ok) { setError(true); return }
                const products = await response.json()
                setProducts(products);
            } catch (error) {
                setProducts([])
                setError(true)
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
        <h1 className={styles.menuHeading}>Menu Categories</h1>
        <div className={styles.categoriesContainer}>
            {categories.map(category => (
                <MenuCatagoryElement key={category} type={category} onClickCategory={onClickCategory} selectedCategory={selectedCategory}/>
            ))}
        </div>
        <h1 className={styles.selectedCategoryName}>{selectedCategory}</h1>
        <div key={selectedCategory} className={styles.productsContainer}>
            {error
                ? <p className={styles.errorMessage}>Failed to load products. Please try again later.</p>
                : products.map((product) => (
                    <ProductCard key={product._id} productData={product} />
                ))
            }
        </div>
    </div>
}
