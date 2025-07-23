import { useEffect } from "react";
import api from '../api/axios'

export const Unauthorized = () => {
    useEffect(() => {
        try{
            api.post("/api/employee/logout", { logoutTime: Date.now() });
            console.log("Forcefully logged out");
        }
        catch(error){
            console.error("eeror  while kicking out..", error);
        }
    }, [])

    return (
        <div className="unauthorized">
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this page.</p>
            <button onClick={() => (window.location.href = "/") }> go to login </button>
        </div>
    );
}
