import React, { useEffect, useState } from "react";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/data")  // No need for "http://127.0.0.1:5000" if proxy is set in package.json
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h1>DeeroGraphy</h1>
            <button onClick={() => window.location.reload()}>Refresh Data</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name ? `${item.name} - ${item.email}` : JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
