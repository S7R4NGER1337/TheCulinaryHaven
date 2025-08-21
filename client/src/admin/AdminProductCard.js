import styles from './adminProductCard.module.css'
import { useNavigate } from 'react-router-dom'

export default function AdminProductCard({ productData, deleteProduct }) {
    const navigate = useNavigate()
    return <>
        <div className={styles.productContainer}>
            <img className={styles.productImage} src={productData.image} alt='productImage' />
            <div className={styles.productInformation}>
                <h1 className={styles.productName}>{productData.name}</h1>
                <p className={styles.productDescription}>{productData.description}</p>
                <p className={styles.productPrice}>${productData.price}</p>
            </div>
            <div className={styles.adminButtons}>
                <button className={`${styles.adminEdit} ${styles.adminButton}`} onClick={() => navigate(`/admin/edit/${productData._id}`)}>Edit</button>
                <button className={`${styles.adminDelete} ${styles.adminButton}`} onClick={() => deleteProduct(productData._id)}>Delete</button>
            </div>
        </div>
    </>
}