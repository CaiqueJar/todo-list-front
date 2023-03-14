import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../api';

function CreateModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [hour, setHour] = useState();
  const [date, setDate] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleName = (e) => setName(e.target.value);
  const handleHour = (e) => setHour(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  

  const handleSubmit=(e)=> {
    e.preventDefault()

    const data = {
      name: name,
      hour: hour,
      date: date,
    }

    api.post('http://localhost:8080/api/v1/task', data);
    window.location.reload(false);

  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        New task
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col>
                  <Form.Control placeholder="Task name" onChange={handleName} />
                </Col>
                <Col>
                  <Form.Control type="time" placeholder="Task hour" onChange={handleHour} />
                </Col>
                <Col>
                  <Form.Control type='date' placeholder="Task date" onChange={handleDate}/>
                </Col>
              </Row>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type='submit'>
              Add
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  );
}

export default CreateModal;