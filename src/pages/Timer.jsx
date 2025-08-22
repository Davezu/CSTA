import {useEffect, useState} from "react";

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false); 

    useEffect(() => {
        let interval;
        if(isRunning){
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return() => clearInterval(interval);
    },   [isRunning]);

    const formTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2,'0')}`;
    };
    return(
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Time</h1>
            <h2>{formTime()}</h2>
            <button onClick={()=> setRunning(true)}>Start</button>
            <button onClick={()=> setRunning(false)}>Stop</button>
            <button onClick={()=> {setRunning(false); setTime(0);}}>reset</button>
        </div>
    );
}
export default Timer;