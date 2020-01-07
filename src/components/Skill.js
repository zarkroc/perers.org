import React from 'react';


const Skill = (props) => {
    if (props.skill) {
        var output = props.skill.map((element) => {
            return (<section className="skill" key={element._id}>
                <p>{element.name} {element.level}</p>
            </section>)
        });
        return (
            <article className="skills">
                {output}
            </article>
        );
    }
    return (
        <section className="skill">
            <p>No information found</p>
        </section>
    );


};

export default Skill;