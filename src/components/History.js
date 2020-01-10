import React, { useState } from 'react';
import EditHistory from './EditWork'

const History = (props) => {
    const [showEdit, setShowEdit] = useState(false);

    const displayEdit = (() => {
        setShowEdit(!showEdit);
    });

    if (props.history) {
        if (showEdit) {
            return (<EditHistory id={props.history._id} company={props.history.company}
                desc={props.history.description} role={props.history.role} start={props.history.start}
                stop={props.history.stop} callback={displayEdit} />);
        }
        return (<section className="work" key={props.history._id}>
            <p>{props.history.company}</p>
            <p>{props.history.description}</p>
            <p>{props.history.role}</p>
            <p>{props.history.start} - {props.history.stop}</p>
            {sessionStorage.getItem("token") ? <div>
                <button className="btnPrimary" onClick={displayEdit}>Edit</button>
            </div> : null}
        </section>)
    }
    return (
        <section className="history">
            <p>No information found</p>
        </section>
    );


};

export default History;