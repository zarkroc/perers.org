import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditAbout from './EditAbout';
import CreateAbout from './CreateAbout';
import About from './About';

const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [showAbout, setShowAbout] = useState(true);
    const [about, setAbout] = useState('');
    const [title, setTitle] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    var apiURL;
    if (process.env.NODE_ENV === "production") {
        apiURL = "https://api.perers.org/"
    } else {
        apiURL = "http://localhost:1337"
    }

    useEffect(() => {
        fetch(apiURL, {
            headers: {
                'api_key': apiKey
            }
        })
            .then(res => res.json())
            .then(function (res) {
                if (res.data) {
                    setTitle(res.data.title);
                    setAbout(res.data.about);
                } else {
                    setTitle("Not found");
                    setAbout("Not found");
                }
            });
    }, [apiURL]);

    const displayCreate = (() => {
        setShowCreate(!showCreate);
        displayAbout()
    });

    const displayEdit = (() => {
        setShowEdit(!showEdit);
        displayAbout()
    });

    const displayAbout = (() => {
        setShowAbout(!showAbout);
    });

    return (
        <main>
            <h2>{title}</h2>
            <article className="me-article">
                {showEdit ? <EditAbout name={about.name} homeTown={about.location} desc={about.description} interest={about.interest} callBack={displayEdit} /> : null}
                {showCreate ? <CreateAbout /> : null}
                {showAbout ? <About /> : null}
                {sessionStorage.getItem("token") ? <div>
                    <button className="btnPrimary" onClick={displayCreate}>Create</button>
                    <button className="btnPrimary" onClick={displayEdit}>Edit</button>
                </div> : null}
            </article>
            {sessionStorage.getItem("token") ? <Link to="/login"><button className="btnPrimary" type="button">Logout</button></Link> : <Link to="/login"><button className="btnPrimary" type="button">Login</button></Link>}

        </main>
    );
};

export default Home;