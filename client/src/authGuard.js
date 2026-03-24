import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

export default function AuthGuard() {
    const [adminStatus, setAdminStatus] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkIfAdmin() {
            try {
                const response = await fetch(`${API_URL}/admin/check`, {
                    method: "GET",
                    credentials: "include"
                });

                if (response.status === 200) {
                    setAdminStatus(true);
                } else {
                    setAdminStatus(false);
                }
            } catch (err) {
                setAdminStatus(false);
            } finally {
                setLoading(false);
            }
        }

        checkIfAdmin();
    }, []);

    if (loading) return <h2>Loading...</h2>

    return adminStatus ? <Outlet /> : <Navigate to="/admin/login" />
}