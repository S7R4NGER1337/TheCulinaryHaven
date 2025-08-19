import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import styles from './admin.module.css'
import AdminProductCard from "./AdminProductCard"

export default function Admin() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllProducts() {
            const response = await fetch('http://localhost:3030/products')
            const products = await response.json()

            setProducts(products)
        }
        getAllProducts()
    }, [])


    return <>
        <h1 className={styles.goBack} onClick={() => navigate('/')}>Back to the app</h1>
        <div className={styles.productsContainer}>
            {products.map(product => <AdminProductCard productData={product} key={product} />)}
        </div>
    </>
}