import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './index.css';


const ActivityList = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8100/activities")
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch((e) => console.error("Error: ", e));
    }, []);

    return (
        <>
            <div><p></p></div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <h1>Activity List</h1>
                <Link to="/activities/new/">
                    <button className="btn btn-primary btn-lg px-4 gap-3">Add an Activity</button>
                </Link>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        return (
                            <tr key={activity.id}>
                                <td>{activity.title}</td>
                                <td>{activity.date}</td>
                                <td>{activity.place}</td>
                                <td>{activity.notes}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ActivityList;