import { useState } from 'react'
import styles from './adminLogin.module.css'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    })
    const navigate = useNavigate()

    async function loginSubmit() {
        if(loginData.userName === '' || loginData.password === '') return

        const response = await fetch('http://localhost:3030/admin/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({username: loginData.userName, passwordHash: loginData.password})
        })

        const authToken = await response.json()
        if(!response.ok) console.log(authToken.msg)
        navigate('/admin')
        
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
                <input className={styles.input} value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
            </div>
            <button className={styles.loginButton} onClick={() => loginSubmit()}>Login</button>
        </div>
    )
}