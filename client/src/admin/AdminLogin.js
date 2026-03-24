import { useState } from 'react'
import styles from './adminLogin.module.css'
import { useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

export default function AdminLogin() {
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function loginSubmit() {
        if(loginData.userName === '' || loginData.password === '') return
        setError('')

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({username: loginData.userName, passwordHash: loginData.password})
            })

            const authToken = await response.json()
            if (!response.ok) {
                setError(authToken.msg)
                return
            }
            navigate('/admin')
        } catch (err) {
            setError('Network error. Please try again.')
        }
    }
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginHeading}>ADMIN LOGIN</h1>
            <div className={styles.inputContainer}>
                <label>Name</label>
                <input className={styles.input} value={loginData.userName} onChange={(e) => setLoginData({...loginData, userName: e.target.value})}/>
            </div>
            <div className={styles.inputContainer}>
                <label>Password</label>
                <input type="password" className={styles.input} value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
        <button className={styles.loginButton} onClick={() => loginSubmit()}>Login</button>
        </div>
    )
}