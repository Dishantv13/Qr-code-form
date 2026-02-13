import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AdminRoute({ children, requireAuth = true }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    const checkAuth = () => {
        const adminUser = localStorage.getItem('adminUser');
        const authToken = localStorage.getItem('token');
        
        if (adminUser && authToken) {
            try {
                JSON.parse(adminUser);
                setIsAuthenticated(true);
                setToken(authToken);
                setIsLoading(false);
            } catch (error) {
                localStorage.removeItem('adminUser');
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setToken(null);
                setIsLoading(false);
            }
        } else {
            setIsAuthenticated(false);
            setToken(null);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
        
        const handleStorageChange = () => {
            checkAuth();
        };

        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleAuthChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (requireAuth) {
        if (!isAuthenticated || !token) {
            return <Navigate to="/admin-auth" replace />;
        }
        return children;
    }

    if (!requireAuth) {
        if (isAuthenticated && token) {
            return <Navigate to="/admin" replace />;
        }
        return children;
    }
}

export default AdminRoute;
