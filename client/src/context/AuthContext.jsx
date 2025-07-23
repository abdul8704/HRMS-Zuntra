import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionInitialized, setSessionInitialized] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const isLoginRoute = location.pathname === "/";

        if (sessionInitialized || isLoginRoute) {
            setLoading(false);
            return;
        }

        const fetchSession = async () => {
            try {
                const res = await api.get("/api/employee/emp-data/me");
                setUser(res.data.data);
            } catch (err) {
                console.error("Unable to set global data", err.message);
                setUser(null);
            } finally {
                setSessionInitialized(true);
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionInitialized, location.pathname]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
