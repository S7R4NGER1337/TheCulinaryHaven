import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from './admin.module.css'
import AdminProductCard from "./AdminProductCard"
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import API_URL from '../api'

export default function Admin() {
    const [products, setProducts] = useState([])
    const [loadStatus, setLoadStatus] = useState(true)
    const navigate = useNavigate()

    async function logout() {
        try {
            await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
        } catch (err) {
            // proceed with redirect regardless
        }
        navigate('/admin/login')
    }

    useEffect(() => {
        async function getAllProducts() {
            try {
                const response = await fetch(`${API_URL}/products`)
                if (!response.ok) throw new Error('Failed to fetch products')
                const products = await response.json()
                setProducts(products)
            } catch (err) {
                setProducts([])
            } finally {
                setLoadStatus(false)
            }
        }
        getAllProducts()
    }, [])

    const Loader = () => (
        <Box sx={{ width: '90rem', margin: '3rem' }}>
            <Skeleton animation="wave" sx={{ height: '6rem' }} />
            <Skeleton animation="wave" sx={{ height: '6rem' }} />
            <Skeleton animation="wave" sx={{ height: '6rem' }} />
        </Box>
    )

    async function deleteProduct(id) {
        try {
            await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id))
        } catch (err) {
            // deletion failed silently - product list unchanged
        }
    }
    return (<>
        <div className={styles.adminLinks}>
            <h1 className={styles.goBack} onClick={() => navigate('/')}>Back to the app</h1>
            <h1 className={styles.goBack} onClick={() => navigate('/admin/create')}>Create new product</h1>
            <h1 className={styles.goBack} onClick={logout}>Logout</h1>
        </div>
        {loadStatus ? <Loader /> : <>
            <div className={styles.productsContainer}>
                {products.map(product => <AdminProductCard productData={product} key={product._id} deleteProduct={deleteProduct} />)}
            </div>
        </>}
    </>)
}