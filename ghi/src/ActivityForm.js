import React, { useState } from 'react';

const ActivityForm = () => {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [place, setPlace] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newActivity = {
            title,
            date,
            place,
            notes,
        }

        const activityUrl = "http://localhost:8100/activities";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(newActivity),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(activityUrl, fetchConfig)
            .then(response => response.json())
            .then( () => {
                setTitle('');
                setDate('');
                setPlace('');
                setNotes('');
            })
            .catch(e => console.log("Error: ", e));
    }

    // const handleTitleChange = (event) => {
    //     const value = event.target.value;
    //     setTitle(value);
    // }
    // const handlePlaceChange = (event) => {
    //     const value = event.target.value;
    //     setPlace(value);
    // }
    // const handleNotesChange = (event) => {
    //     const value = event.target.value;
    //     setNotes(value);
    // }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an Activity</h1>
                    <form onSubmit={handleSubmit} id="create-bin-form">
                        <div className="form-floating mb-3">
                            <label htmlFor='title'>Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} required type="text" name="activity title" id="title" className="form-control form-input" />
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor='date'>Date</label>
                            <input value={date} onChange={(e)=>setDate(e.target.value)} required type="date" name="activity date" id="date" className="form-control form-input" />
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor='place'>Place</label>
                            <input value={place} onChange={(e)=>setPlace(e.target.value)} required type="text" name="activity place" id="place" className="form-control form-input" />
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor='notes'>Notes</label>
                            <input value={notes} onChange={(e)=>setNotes(e.target.value)} required type="text" name="activity notes" id="notes" className="form-control form-input" />
                       </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ActivityForm;