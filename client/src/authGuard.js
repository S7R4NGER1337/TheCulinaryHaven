import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthGuard() {
    const [adminStatus, setAdminStatus] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkIfAdmin() {
            const token = localStorage.getItem('token')
            if (!token) {
                setAdminStatus(false)
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`http://localhost:3030/check/${token}`)
                const isTokenValid = await response.json()
                setAdminStatus(isTokenValid)
            } catch (err) {
                setAdminStatus(false)
            } finally {
                setLoading(false)
            }
        }

        checkIfAdmin()
    }, [])

    if (loading) {
        return <h2>Loading...</h2>
    }

    return adminStatus ? <Outlet /> : <Navigate to="/admin/login" />
}