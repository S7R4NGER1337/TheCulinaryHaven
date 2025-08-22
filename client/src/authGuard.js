import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthGuard() {
    const [adminStatus, setAdminStatus] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkIfAdmin() {
            try {
                const response = await fetch("http://localhost:3030/admin/check", {
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