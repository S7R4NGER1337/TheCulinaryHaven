import { useState } from 'react';
import styles from './nav.module.css'

export default function Nav({ bannerRef, menuRef, aboutUsRef }) {

    const [displayMobileLinks, setDisplayMobileLinks] = useState('none')

    function scrollToElement(element) {
        element.current.scrollIntoView({ behavior: "smooth" });
    }

    function changeMenuStatus() {
        return displayMobileLinks === 'none' ? 'block': 'none'
    }

    function onClickMobileLinks(ref) {
        ref.current.scrollIntoView({ behavior: "smooth" });
        setDisplayMobileLinks('none')
    }

    return <div className={styles.navContainer}>
        <h1 style={{display: displayMobileLinks==='none' ? 'block': 'none'}}className={styles.navHeading} onClick={() => scrollToElement(bannerRef)}>The Culinary Haven</h1>
        <div className={styles.navLinks}>
            <p className={styles.navLink} onClick={() => scrollToElement(bannerRef)}>Home</p>
            <p className={styles.navLink} onClick={() => scrollToElement(menuRef)}>Menu</p>
            <p className={styles.navLink} onClick={() => scrollToElement(aboutUsRef)}>About Us</p>
        </div>

        <div className={styles.mobileNav}>
            <img className={styles.mobileNavIcon} src='/menuIcon.svg' alt='menuIcon' onClick={() => setDisplayMobileLinks(changeMenuStatus())}/>
            <div className={styles.mobileNavLinks} style={{display: `${displayMobileLinks}`}}>
                <p className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(bannerRef)}>Home</p>
                <p className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(menuRef)}>Menu</p>
                <p className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(aboutUsRef)}>About Us</p>
            </div>
        </div>
    </div>
}