import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './adminForm.module.css'

const API_URL = process.env.REACT_APP_API_URL

export default function AdminForm() {
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const productId = useLocation().pathname.split('/')[3]
    const page = useLocation().pathname.split('/')[2]

    useEffect(() => {
        async function getProductData() {
            try {
                const response = await fetch(`${API_URL}/products/${productId}`)
                if (!response.ok) return
                const productData = await response.json()
                setProduct(productData)
            } catch (err) {
                // fetch failed, form stays empty
            }
        }
        getProductData()
    }, [productId])

    async function refreshAccessToken() {
        try {
            const res = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            })
            return res.ok
        } catch (err) {
            return false
        }
    }

    async function createProduct(retryCount = 0) {
        const res = await fetch(`${API_URL}/products/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(product)
        })
        if ((res.status === 401 || res.status === 403) && retryCount === 0) {
            const refreshed = await refreshAccessToken()
            if (!refreshed) return null
            return createProduct(1)
        }
        return await res.json()
    }

    async function editProduct(retryCount = 0) {
        const res = await fetch(`${API_URL}/products/edit/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(product)
        })
        if ((res.status === 401 || res.status === 403) && retryCount === 0) {
            const refreshed = await refreshAccessToken()
            if (!refreshed) return null
            return editProduct(1)
        }
        return await res.json()
    }

    async function buttonOnclick() {
        if (!validateForm()) return

        try {
            if (page === 'edit') {
                await editProduct()
            } else {
                await createProduct()
            }
            navigate('/admin')
        } catch (err) {
            // request failed, stay on page
        }
    }

    function validateForm() {
        const { name, description, image, category, price } = product
        if (!name || name.trim() === '') return false
        if (!description || description.trim() === '') return false
        if (!image || image.trim() === '') return false
        if (!category) return false
        if (price === undefined || price === null || price === '') return false
        return true
    }

    function inputOnChange(e) {
        const targetName = e.target.name
        const targetValue = e.target.value

        setProduct({ ...product, [targetName]: targetValue })
    }

    return (
        <div className={styles.editContainer}>
            <form className={styles.productForm}>
                <div className={styles.formInputContainer}>
                    <label for='name'>Name</label>
                    <textarea value={product.name} onChange={(e) => inputOnChange(e)} className={styles.formInput} type='text' name='name' autoComplete='none' />
                </div>

                <div className={styles.formInputContainer}>
                    <label>Description</label>
                    <textarea value={product.description} onChange={(e) => inputOnChange(e)} className={styles.formInput} type='text' name='description' autoComplete='none' />
                </div>

                <div className={styles.formInputContainer}>
                    <label>Image</label>
                    <textarea value={product.image} onChange={(e) => inputOnChange(e)} className={styles.formInput} type='text' name='image' autoComplete='none' />
                </div>

                <div className={styles.formInputContainer}>
                    <label>Catagory</label>
                    <select value={product.category} onChange={(e) => inputOnChange(e)} className={styles.formInput} name="category">
                        <option value="Appetizers">Appetizers</option>
                        <option value="MainCourses">MainCourses</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>

                <div className={styles.formInputContainer}>
                    <label>Price in $</label>
                    <input value={product.price} onChange={(e) => inputOnChange(e)} className={styles.formInput} type='number' autoComplete='none' name='price' />
                </div>

                <button className={styles.formButton} type='button' onClick={() => buttonOnclick()}>{page === 'edit' ? 'Edit Product' : 'Create Product'}</button>
            </form>
        </div>
    )
}
