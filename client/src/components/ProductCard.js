import styles from './productCard.module.css'

export default function ProductCard({ productData }) {
    return <div className={styles.products}>
            <div className={styles.productInfo}>
                <h1 className={styles.productName}>{productData.name}</h1>
                <p className={styles.productDescription}>{productData.description}</p>
                <p className={styles.productPrice}>${productData.price}</p>
            </div>
            <img src={productData.image} alt="product" className={styles.productImage} />
        </div>
}