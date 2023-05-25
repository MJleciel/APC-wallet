import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer'

export default function useIdle({ onIdle, idleTime = 1 }) {
    const [isIdle, setIsIdle] = useState();

    const handleOnIdle = event => {
        setIsIdle(true);
        onIdle()
    }
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000*60*idleTime,
        onIdle: handleOnIdle,
        debounce: 500
    })

    return {
        getRemainingTime,
        getLastActiveTime,
        isIdle
    }
}