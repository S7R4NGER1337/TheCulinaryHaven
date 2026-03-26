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
        <button style={{display: displayMobileLinks==='none' ? 'block': 'none'}} className={styles.navHeading} onClick={() => scrollToElement(bannerRef)}>The Culinary Haven</button>
        <nav className={styles.navLinks}>
            <button className={styles.navLink} onClick={() => scrollToElement(bannerRef)}>Home</button>
            <button className={styles.navLink} onClick={() => scrollToElement(menuRef)}>Menu</button>
            <button className={styles.navLink} onClick={() => scrollToElement(aboutUsRef)}>About Us</button>
        </nav>

        <div className={styles.mobileNav}>
            <img className={styles.mobileNavIcon} src='/menuIcon.svg' alt='Open navigation menu' onClick={() => setDisplayMobileLinks(changeMenuStatus())}/>
            <div className={styles.mobileNavLinks} style={{display: `${displayMobileLinks}`}}>
                <button className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(bannerRef)}>Home</button>
                <button className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(menuRef)}>Menu</button>
                <button className={`${styles.navLink} ${styles.mobileNavLink}`} onClick={() => onClickMobileLinks(aboutUsRef)}>About Us</button>
            </div>
        </div>
    </div>
}
