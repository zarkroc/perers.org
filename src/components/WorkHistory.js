import React, { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const WorkHistory = () => {
    const [workHistory, setWorkHistory] = useState('');
    const [title, setTitle] = useState('');
    var apiURL;

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://api.perers.org/workhistory"
    } else {
        apiURL = "http://localhost:1337/workhistory"
    }

    useEffect(() => {
        fetch(apiURL, {
            headers: {
                'api_key': apiKey,
            }
        })
            .then(res => res.json())
            .then(function (res) {
                if (res.data) {
                    setWorkHistory(res.data.workHistory);
                    setTitle(res.data.title);
                }
            });
    }, [apiURL]);

    if (workHistory) {
        console.log('====================================');
        console.log(workHistory);
        console.log('====================================');
        return (
            <main>
            <h2>{title}</h2>
            <article className="me-article"></article>
            <article className="me-article">
                <p>competence: {workHistory.name}</p>
                <p>Level: {workHistory.level}</p>
            </article>
            </main>
        );
    }
    return (
        <article className="me-article">
            <p>No information found</p>
        </article>
    );


};

export default WorkHistory;