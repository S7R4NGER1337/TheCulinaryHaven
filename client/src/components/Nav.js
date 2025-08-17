import styles from './nav.module.css'

export default function Nav({ bannerRef, menuRef, aboutUsRef }) {

    function scrollToElement(element) {
        element.current.scrollIntoView({ behavior: "smooth" });
    }

    return <div className={styles.navContainer}>
        <h1 className={styles.navHeading} onClick={() => scrollToElement(bannerRef)}>The Culinary Haven</h1>
        <div className={styles.navLinks}>
            <p className={styles.navLink} onClick={() => scrollToElement(bannerRef)}>Home</p>
            <p className={styles.navLink} onClick={() => scrollToElement(menuRef)}>Menu</p>
            <p className={styles.navLink} onClick={() => scrollToElement(aboutUsRef)}>About Us</p>
        </div>
    </div>
}