import { useEffect } from 'react';  

export default function useOnKeyDown (callback, keys) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (keys.includes(event.key)) {
                callback(event.key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, keys]);
}