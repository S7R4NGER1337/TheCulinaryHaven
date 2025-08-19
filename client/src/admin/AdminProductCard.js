import styles from './adminProductCard.module.css'

export default function AdminProductCard({ productData }) {

    return (
        <div className={styles.productContainer}>
            <img className={styles.productImage} src={productData.image} alt='productImage' />
            <div className={styles.productInformation}>
                <h1 className={styles.productName}>{productData.name}</h1>
                <p className={styles.productDescription}>{productData.description}</p>
                <p className={styles.productPrice}>${productData.price}</p>
            </div>
            <div className={styles.adminButtons}>
                <button className={`${styles.adminEdit} ${styles.adminButton}`}>Edit</button>
                <button className={`${styles.adminDelete} ${styles.adminButton}`}>Delete</button>
            </div>
        </div>
    )
}