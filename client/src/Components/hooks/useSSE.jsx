import { useState, useEffect, useRef } from 'react';

const useSSE = (url, initialData) => {
    const [data, setData] = useState(initialData);
    const errorTimeoutRef = useRef(null);

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            clearTimeout(errorTimeoutRef.current);
            setData(JSON.parse(event.data));
        };

        eventSource.onerror = (error) => {
            console.error("SSE error:", error);
            // Delay setting error state to handle quick reconnects gracefully
            errorTimeoutRef.current = setTimeout(() => {
                setData(d => ({ ...d, connected: false }));
                eventSource.close(); // Close after setting data to disconnected
            }, 3000); // wait 3 seconds before declaring disconnected
        };

        return () => {
            clearTimeout(errorTimeoutRef.current);
            eventSource.close(); // Clean up the event source if the component unmounts
        };
    }, [url]);

    return data;
};

export default useSSE;
