import React, { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const About = () => {
    const [about, setAbout] = useState('');
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
                    setAbout(res.data.about);
                }
            });
    }, [apiURL]);

    if (about) {
        return (
            <section className="about">
                <p>Namn: {about.name}</p>
                <p>Hemort: {about.location}</p>
                <p>Beskrivning: {about.description}</p>
                <p>Intressen: {about.interest}</p>
            </section>
        );
    }
    return (
        <section className="about">
            <p>No information found</p>
        </section>
    );


};

export default About;