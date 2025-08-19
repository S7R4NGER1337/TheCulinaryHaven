import styles from './adminProductCard.module.css'

export default function AdminProductCard({productData}){

    return(
        <div className={styles.productContainer}>
            <img src={productData.image} alt='productImage'/>
            <h1>{productData.name}</h1>
            <p>{productData.description}</p>
            <p>{productData.price}</p>
        </div>
    )
}