import styles from './adminLogin.module.css'

export default function AdminLogin() {

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginHeading}>ADMIN LOGIN</h1>
            <div className={styles.inputContainer}>
                <label>Name</label>
                <input className={styles.input} />
            </div>
            <div className={styles.inputContainer}>
                <label>Password</label>
                <input className={styles.input} />
            </div>
        </div>
    )
}