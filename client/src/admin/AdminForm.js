import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './adminForm.module.css'

export default function AdminForm() {
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const productId = useLocation().pathname.split('/')[3]
    const page = useLocation().pathname.split('/')[2]
    
    useEffect(() => {
        async function getProductData() {
            const response = await fetch(`http://localhost:3030/products/${productId}`)
            const productData = await response.json()
            setProduct(productData)
        }
        getProductData()
    }, [productId])

    async function buttonOnclick() {
        const adminToken = localStorage.getItem('token')
        if(!validateForm()) return
        if(page === 'edit'){
            await fetch(`http://localhost:3030/products/edit/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminToken
                },
                body: JSON.stringify(product)
            })
        }else{
            await fetch('http://localhost:3030/products/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': adminToken
                },
                body: JSON.stringify(product)
            })
        }
        navigate('/admin')
    }

    function validateForm() {
        let noText = true
        for (const key in product) {
            if(product[key] === ''){
                noText = false
            };
        }   
        return noText        
    }

    function inputOnChange(e) {
        const targetName = e.target.name
        const targetValue = e.target.value

        setProduct({...product, [targetName]: targetValue})
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
                    <input value={product.price} onChange={(e) => inputOnChange(e)} className={styles.formInput} type='number' autoComplete='none' name='price'/>
                </div>

                <button className={styles.formButton} type='button' onClick={() => buttonOnclick()}>{page === 'edit' ? 'Edit Product': 'Create Product'}</button>
            </form>
        </div>
    )
}