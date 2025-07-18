import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If user already set (e.g. after login), skip fetching /me
        if (user !== null) {
            setLoading(false);
            return;
        }

        const fetchSession = async () => {
            try {
                const res = await api.get("/api/employee/emp-data/me"); // Reads JWT from HttpOnly cookie
                setUser(res.data.data); // Set user dtaa globally
            } catch (err) {
                console.log("uanble to set global data ", err.message)
                setUser(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [user]);

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
