import React from 'react';


const History = (props) => {
    if (props.history) {
        var output = props.history.map((element) => {
            return (<section className="work" key={element._id}>
                <p>{element.company}</p>
                <p>{element.description}</p>
                <p>{element.role}</p>
                <p>{element.start} - {element.stop}</p>
            </section>)
        });
        return (
            <article className="history">
                {output}
            </article>
        );
    }
    return (
        <section className="history">
            <p>No information found</p>
        </section>
    );


};

export default History;