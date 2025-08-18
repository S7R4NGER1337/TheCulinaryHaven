import styles from './aboutUs.module.css'

export default function AboutUs() {
    return (<div className={styles.aboutUsContainer}>
        <iframe className={styles.googleMap} title='maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86529.96529047041!2d24.65847314138699!3d42.144091420369016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd108a248763d%3A0x6470d1fa6f1338a0!2z0J_Qu9C-0LLQtNC40LI!5e1!3m2!1sbg!2sbg!4v1755443261398!5m2!1sbg!2sbg" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div className={styles.restaurantInfo}>
                <div className={styles.restaurantLocation}>
                    <h1>The Culinary haven</h1>
                    <p>Old TownCentral District</p>
                    <p>Tsar Boris III Obedinitel Blvd.</p>
                </div>
                <div className={styles.restaurantContact}>
                    <p>Phone: 0123456789</p>
                    <p>Email: theCulinaryHaven@dev.dev</p>
                </div>
            </div>
            <div className={styles.workingHours}>
                <h1>Hours</h1>
                <p>Monday - Thursday: 11:30 AM - 10:00 PM</p>
                <p>Friday: 11:30 AM - 11:30 PM</p>
                <p>Saturday: 10:00 AM - 11:30PM</p>
                <p>Sunday: 10:00 AM - 9:30PM</p>
            </div>
        </div>
    )
}