import React, { useState, useEffect } from "react";
import Add from "./Add";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container } from 'react-bootstrap';

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvents(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr  key={current._id}>
          <td className="events">{current.name}</td>
          <td className="events">{current.location}</td>
          <td className="events">{current.description}</td>
          <td className="events">{current.date}</td>
          <td className="events">{current.time}</td>
          <td className="events">
            <Button className="removebutton p-0" variant="danger" onClick={() => removeEvent(current._id)}> remove</Button>
            <Button className="updatebutton p-0" variant="primary" onClick={() => updateEvent(current)}> update</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <br />
      <Container className="test">
      <table className="test2">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      </Container>
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvents={current}
      />
    </>
  );
}

export default Dashboard;
