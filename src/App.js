import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import api from './api';
import  './App.css';
import CreateModal from './components/CreateModal';
import { BiCheckCircle, BiClipboard } from "react-icons/bi";


class App extends Component {

  
  state = {
    tasks: [],
  }

  async componentDidMount() {
    const response = await api.get('');

    this.setState({ tasks: response.data });
  }
  
  

  render() {

    const { tasks } = this.state;
    var show = false;


    const handleClose = () => show = false;
    const handleShow = () => show = true;
    return(
      <div className="center">
        <div>
          <Row>
            <Col xs={10}>
              <h1>Todo List App</h1>
            </Col>
            <Col>
              <Button variant="outline-secondary" onClick={handleShow}><BiClipboard /></Button>
              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create a new task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {tasks.map(task => {
                        if(task.taskStatusModel === "CHECKED")
                        return(
                          <tr>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.hour}</td>
                            <td>{task.date}</td>
                            <td>
                              <div className='text-center'>
                                <Button variant='outline-primary' className='rounded-circle' onClick={() => api.put('http://localhost:8080/api/v1/task/status/'+task.id).then(window.location.reload())}><BiCheckCircle /></Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="success" type='submit'>
                      Add
                    </Button>
                  </Modal.Footer>

              </Modal>            
            </Col>
          </Row>
        </div>
        <hr />
        <div className="tasks">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Task Name</th>
                <th>Task hour</th>
                <th>Task date</th>
                <th>Task status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => {
                if(task.taskStatusModel === "CREATED")
                return(
                  <tr>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.hour}</td>
                    <td>{task.date}</td>
                    <td>
                      <div className='text-center'>
                        <Button variant='outline-primary' className='rounded-circle' onClick={() => api.put('http://localhost:8080/api/v1/task/status/'+task.id).then(window.location.reload())}><BiCheckCircle /></Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>

        <hr />

        <div className='buttons'>
          <CreateModal />
        </div>
      </div>
    );
  }
}


export default App;
