import React, { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const Skills = () => {
    const [skills, setSkills] = useState('');
    const [title, setTitle] = useState('');
    var apiURL;

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://api.perers.org/competence"
    } else {
        apiURL = "http://localhost:1337/competence"
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
                    setSkills(res.data.skills);
                    setTitle(res.data.title);
                }
            });
    }, [apiURL]);

    if (skills) {
        console.log('====================================');
        console.log(skills);
        console.log('====================================');
        return (
            <main>
            <h2>{title}</h2>
            <article className="me-article"></article>
            <article className="me-article">
                <p>competence: {skills.name}</p>
                <p>Level: {skills.level}</p>
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

export default Skills;