import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import Form from 'react-bootstrap/esm/Form';
import api from './api';
import  './App.css';
import CreateModal from './components/CreateModal';
import { BiTrash } from "react-icons/bi";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


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

    return(
      <div className="center">
        <div>
        <h1>Todo List App</h1>

        </div>
        <hr />
        <div className="tasks">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Task Name</th>
                <th>Task date</th>
                <th>Task status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.hour}</td>
                  <td>
                    <Row>
                      <Col>
                        <Form.Check 
                            type="checkbox"
                            id="check"
                            label="Check"
                            checked={() => console.log("asdasd")}
                          />
                      </Col>
                      <Col>
                        <Button variant='danger' onClick={() => api.delete('http://localhost:8080/api/v1/task/'+task.id).then(window.location.reload())}><BiTrash /></Button>
                      </Col>
                    </Row>
                    </td>
                </tr>
              ))}
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
