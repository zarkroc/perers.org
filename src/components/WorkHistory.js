import React, { useEffect, useState } from 'react';
import AddWorkHistory from './AddWorkHistory';
import History from './History';

const apiKey = process.env.REACT_APP_API_KEY;

const WorkHistory = () => {
    const [history, setWorkHistory] = useState('');
    const [title, setTitle] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [showWorkHistory, setShowWorkHistory] = useState(true);
    var apiURL;

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://api.perers.org/competence"
    } else {
        apiURL = "http://localhost:1337/competence"
    }


    const displayAdd = (() => {
        setShowAdd(!showAdd);
        displayWorkHistory()
    });

    const displayWorkHistory = (() => {
        setShowWorkHistory(!showWorkHistory);
    });

    useEffect(() => {
        fetch(apiURL, {
            headers: {
                'api_key': apiKey,
            }
        })
            .then(res => res.json())
            .then(function (res) {
                if (res.data) {
                    setWorkHistory(res.data.history);
                    setTitle(res.data.title);
                }
            });
    }, [apiURL]);

    if (history) {
        console.log('====================================');
        console.log("asdfa");
        console.log('====================================');

        return (
            <main>
                <h2>{title}</h2>
                <article className="me-article">
                    {showAdd ? <AddWorkHistory /> : null}
                    {showWorkHistory ? <History history={history} /> : null}
                    {sessionStorage.getItem("token") ? <div>
                        <button className="btnPrimary" onClick={displayAdd}>Add Work</button>
                    </div> : null}
                </article>
            </main>
        );
    }
    return (
        <main>
            <article className="me-article">
                <p>No information found</p>
                {showAdd ? <AddWorkHistory /> : null}
                <button className="btnPrimary" onClick={displayAdd}>Add Work</button>
            </article>
        </main>
    );


};

export default WorkHistory;