import React, { useEffect, useState } from "react";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/data")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className="container">
            <h1>React + Flask MVP</h1>
            <button onClick={() => window.location.reload()}>Refresh Data</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} - {item.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
