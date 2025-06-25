import { useEffect } from "react";

const useTrackSessionEnd = (userId) => {
    console.log("invoked")
    useEffect(() => {
        console.log("mossi moooosh")
        const handleUnload = () => {
            console.log('real')
            const payload = {
                userId,
                logoutTime: new Date().setSeconds(0, 0),
            };

            const blob = new Blob([JSON.stringify(payload)], {
                type: "application/json",
            });

            navigator.sendBeacon("/api/employee/logout", blob);
        };

        window.addEventListener("unload", handleUnload);
        return () => window.removeEventListener("unload", handleUnload);
    }, [userId, sessionId]);
};

export default useTrackSessionEnd;
