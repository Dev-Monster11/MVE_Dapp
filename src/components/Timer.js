import * as React from "react";
// import { useState, useEffect } from "react";
import Countdown from "react-countdown";

export default function Timer(props) {
    // const [currentTime, getCurrentTime] = useState(Date.now());
    // const [timeString, setTimeString] = useState("00:00:00");
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // if (props.time > 0) window.location.reload();
            // Render a completed state
            return <span>00:00:00</span>;
        } else {
            // Render a countdown
            return (
                <span>
                    {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
                </span>
            );
        }
    };
    console.log(props.time);
    console.log(300000 - ((Date.now() - props.time * 1000) % 300000));
    return (
        <>
            <Countdown date={300000 - ((Date.now() - props.time * 1000) % 300000)} renderer={renderer} />
        </>
    );
}
