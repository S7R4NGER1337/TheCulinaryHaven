import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from './admin.module.css'
import AdminProductCard from "./AdminProductCard"
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function Admin() {
    const [products, setProducts] = useState([])
    const [loadStatus, setLoadStatus] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllProducts() {
            const response = await fetch('http://localhost:3030/products')
            const products = await response.json()

            setProducts(products)
            setLoadStatus(false)
        }
        getAllProducts()
    }, [])

    const Loader = () => (
        <Box sx={{ width: '90rem', margin: '3rem'}}>
            <Skeleton animation="wave" sx={{height: '6rem'}}/>
            <Skeleton animation="wave" sx={{height: '6rem'}}/>
            <Skeleton animation="wave" sx={{height: '6rem'}}/>
        </Box>
    )

    return (<>
        <h1 className={styles.goBack} onClick={() => navigate('/')}>Back to the app</h1>
        {loadStatus ? <Loader /> : <>
            <div className={styles.productsContainer}>
                {products.map(product => <AdminProductCard productData={product} key={product} />)}
            </div>
        </>}
    </>)
}