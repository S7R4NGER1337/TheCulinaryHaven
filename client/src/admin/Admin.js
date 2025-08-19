import { useEffect, useState } from "react"
import styles from './admin.module.css'
import AdminProductCard from "./AdminProductCard"

export default function Admin() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getAllProducts() {
            const response = await fetch('http://localhost:3030/products')
            const products = await response.json()

            setProducts(products)
        }
        getAllProducts()
    }, [])


    return <>
        <div className={styles.productsContainer}>
            {products.map(product => <AdminProductCard productData={product} key={product.id}/>)}
        </div>
    </>
}