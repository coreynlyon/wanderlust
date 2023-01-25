import { useState, useEffect } from "react";
import { Title } from '@mantine/core';
import { useParams } from "react-router-dom";

function Checklist() {
    const tripId = useParams();
    const id = Number(tripId.id);
	const [checklists, setChecklists] = useState([]);
    const [item_name, setItemName] = useState("");
    const trip_id = String(id)

	useEffect(() => {
		const fetchChecklists = async () => {
			const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/checklists/trip/${id}`;
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setChecklists(data);
			}
		};
		fetchChecklists();
	}, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            item_name,
            trip_id
         };

        const checklistUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/checklists`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(checklistUrl, fetchConfig);
        if (response.ok) {
            event.target.reset();
            setItemName("");
            const reloadUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/checklists/trip/${id}`;
            const reloadResponse = await fetch(reloadUrl);
            const newChecklist = await reloadResponse.json();
            setChecklists(newChecklist);
        }
    };

    const deleteChecklist = (id) => async () => {
    try {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/checklists/${id}`;
      const deleteResponse = await fetch(url,
          {
              method: "delete"
          }
      );

      if (deleteResponse.ok) {
        const reloadUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/checklists/trip/${id}`;
        const reloadResponse = await fetch(reloadUrl);
        const newChecklist = await reloadResponse.json();
        setChecklists(newChecklist);
      }

    }
    catch (err) {

    }
  };

	return (
        <section style={{ backgroundColor: '#d0d9f5' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">

                    <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">

                        <Title className="mb-3 text-center">Checklist</Title>

                        <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
                            <div className="form-outline flex-fill">
                                <input
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="Enter checklist item"
                                    required
                                    type="text"
                                    id="item_name"
                                    name="item_name"
                                    className="form-control form-control-lg"
                                    />
                            </div>
                            <button className="btn btn-primary btn-lg ms-2">Add</button>
                        </form>

                        <ul className="list-group mb-0">
                        {checklists.map((checklist) => {
                            return (
                                <li key={checklist.id}
                                    className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                    <div className="d-flex align-items-center">
                                    <input className="form-check-input me-2" type="checkbox" value={checklist.item_name} aria-label="..." />
                                    {checklist.item_name}
                                    </div>
                                    {/* <Button  data-mdb-toggle="tooltip" title="Remove item"> */}
                                        {/* <img onClick={deleteChecklist(checklist.id)} width="20" height="20" src="https://cdn-icons-png.flaticon.com/512/6065/6065488.png" alt="edit"/> */}
                                        <img onClick={deleteChecklist(checklist.id)} width="10" height="10" src="https://cdn-icons-png.flaticon.com/512/109/109602.png" alt="x-mark" />
                                    {/* </Button> */}
                                </li>
                            )
                        })}
                        </ul>

                    </div>
                    </div>

                </div>
                </div>
            </div>
        </section>
	);
};

export default Checklist
