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
        apiURL = "https://api.perers.org/workhistory"
    } else {
        apiURL = "http://localhost:1337/workhistory"
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
                    setWorkHistory(res.data.workPlaces);
                    setTitle(res.data.title);
                }
            });
    }, [apiURL]);

    if (history) {
        return (
            <main>
                <h2>{title}</h2>
                <article className="me-article">
                    {showAdd ? <AddWorkHistory /> : null}
                    {showWorkHistory ? history.map((element) => {
                        return <History key={element._id} history={element} callBack={displayAdd} />
                    }) : null}
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
                {sessionStorage.getItem("token") ? <div>
                    <button className="btnPrimary" onClick={displayAdd}>Add Work</button>
                </div> : null}
            </article>
        </main>
    );


};

export default WorkHistory;