import styles from './banner.module.css'

export default function Banner({menuRef}) {
    return <>
        <div className={styles.bannerContainer}>
            <img src="/banner.png" alt="bannerImage" className={styles.bannerImage}/>
            <div className={styles.bannerInfo}>
                <h1 className={styles.bannerName}>The Culinary Haven</h1>
                <p className={styles.bannerDescription}>Experience the art of fine dining with our exquisite menu.</p>
                <button className={styles.bannerButton} onClick={() => menuRef.current.scrollIntoView({ behavior: "smooth" })}>View Menu</button>
            </div>
        </div>
    </>
}