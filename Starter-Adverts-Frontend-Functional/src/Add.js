import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Form } from 'react-bootstrap';


function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvents) {
      result = props.client.updateEvents(
        props.currentEvents._id,
        e.target.eventsName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.date.value,
        e.target.time.value,

      );
    } else {
      result = props.client.addEvents(
        e.target.eventsName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.date.value,
        e.target.time.value,
      );
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (

    <Container className="create">
    <span className="createheader">{props.currentEvents ? "Update Event" : "Create Event"}</span>
      <br />
      <Form onSubmit={(e) => submitHandler(e)} id="addForm">
        name
        <input className="createinput"
          type="text"
          defaultValue={props.currentEvents?.name}
          name="eventsName"
          disabled={disabled}
        />
        location
        <input className="createinput"
          type="text"
          defaultValue={props.currentEvents?.location}
          name="location"
          disabled={disabled}
        />
        description
        <textarea className="createinput" id="createdescription"
          type="text"
          defaultValue={props.currentEvents?.description}
          name="description"
          disabled={disabled}
        />
        date
        <input className="createinput"
          type="date"
          defaultValue={props.currentEvents?.date}
          name="date"
          disabled={disabled}
        />
        time
        <input className="createinput"
          type="time"
          defaultValue={props.currentEvents?.time}
          name="time"
          disabled={disabled}
        />
        <br />
        <Button variant="success" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </Button>
      </Form>
      </Container> 
  );
}

export default Add;
