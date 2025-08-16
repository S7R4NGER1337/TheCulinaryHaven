import styles from './nav.module.css'

export default function Nav() {
    return <div className={styles.navContainer}>
        <h1 className={styles.navHeading}>The Culinary Haven</h1>
        <div className={styles.navLinks}>
            <p className={styles.navLink}>Home</p>
            <p className={styles.navLink}>Menu</p>
            <p className={styles.navLink}>About Us</p>
        </div>
    </div>
}