import React, { Component } from 'react';
import api from './api';

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
      <div>
        <h1>List tasks</h1>
        {console.log(tasks)}
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.name}</h2>
          </li>
        ))}

      </div>
    );
  }
}

export default App;
