import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Footer.css'

const socket = io.connect("http://localhost:5000");

function UserCounter() {
    const [userCount, setUserCount] = useState();

    useEffect(() => {
        socket.on("userCountUpdate", (newUserCount) => {
            setUserCount(newUserCount);
        });
    }, [])

    return (
        <div className="footer-wrapper bg-light">
            <ul className="list-inline">
                <div className="list-inline-item" to={"/"}>Current Active Users: {userCount}</div>
            </ul>
        </div>
    )
}

export default UserCounter;