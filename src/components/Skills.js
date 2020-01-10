import React, { useEffect, useState } from 'react';
import AddSkill from './AddSkills';
import Skill from './Skill';

const apiKey = process.env.REACT_APP_API_KEY;

const Skills = () => {
    const [skills, setSkills] = useState('');
    const [title, setTitle] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [showSkills, setShowSkills] = useState(true);
    var apiURL;

    if (process.env.NODE_ENV === "production") {
        apiURL = "https://api.perers.org/competence"
    } else {
        apiURL = "http://localhost:1337/competence"
    }


    const displayAdd = (() => {
        setShowAdd(!showAdd);
        displaySkills()
    });

    const displaySkills = (() => {
        setShowSkills(!showSkills);
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
                    setSkills(res.data.skills);
                    setTitle(res.data.title);
                }
            });
    }, [apiURL]);

    if (skills) {

        return (
            <main>
            <h2>{title}</h2>
            <article className="me-article">
            {showAdd ? <AddSkill callback={displayAdd} /> : null}
            {showSkills ? <Skill skill={skills}/> : null}
                {sessionStorage.getItem("token") ? <div>
                    <button className="btnPrimary" onClick={displayAdd}>Add skill</button>
                </div> : null}
            </article>
            </main>
        );
    }
    return (
        <article className="me-article">
            <p>No information found</p>
            <button className="btnPrimary" onClick={displayAdd}>Add skill</button>
        </article>
    );


};

export default Skills;