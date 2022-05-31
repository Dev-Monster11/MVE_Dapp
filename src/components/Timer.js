import * as React from "react";
// import { useState, useEffect } from "react";
import Countdown from "react-countdown";

export default function Timer(props) {
    // const [currentTime, getCurrentTime] = useState(Date.now());
    // const [timeString, setTimeString] = useState("00:00:00");
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if (props.time > 0) window.location.reload();
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
    // const setTimer = () => {
    //     getCurrentTime(Date.now());

    //     var current = props.time + 900 + 750 - Math.trunc(currentTime / 1000) * 1;
    //     if (current === 0) {
    //         window.location.reload();
    //         props.setTimer(null);
    //     }
    //     setTimeString(
    //         ("0" + Math.trunc(current / 3600)).slice(-2) +
    //             ":" +
    //             ("0" + (Math.trunc(current / 60) % 60)).slice(-2) +
    //             ":" +
    //             ("0" + Math.trunc(current % 60)).slice(-2)
    //     );
    // };
    // if (!props.timer) props.setTimer(setInterval(setTimer, 1000));
    // useEffect(() => {}, [currentTime]);

    if (props.time * 1000 + 900000 - Date.now() > 0)
        return (
            <>
                <Countdown date={props.time * 1000 + 900000} renderer={renderer} />
            </>
        );
    else if (props.time * 1000 + 1800000 - Date.now() > 0)
        return (
            <>
                <Countdown date={props.time * 1000 + 1800000} renderer={renderer} />
            </>
        );
    else if (props.time * 1000 + 2700000 - Date.now() > 0)
        return (
            <>
                <Countdown date={props.time * 1000 + 2700000} renderer={renderer} />
            </>
        );
    else
        return (
            <>
                <Countdown date={Date.now() + 900000} renderer={renderer} />
            </>
        );
}
