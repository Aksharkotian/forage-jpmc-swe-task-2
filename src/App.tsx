import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
// Interface to define the structure of the application state
interface IState {
  // Array of ServerRespond objects to store the server's response data
  data: ServerRespond[],
  // Boolean flag to indicate whether the graph should be displayed or not
  showGraph: boolean,
}


/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
renderGraph() {
  // Check if the showGraph flag in the component's state is true
  if (this.state.showGraph) {
    // If true, render the Graph component with the data passed as a prop
    return (<Graph data={this.state.data}/>);
  }
  // If showGraph is false, nothing is rendered
}


 /**
 * Fetch new data from the server and update the state with the received data.
 * This function sets up an interval to repeatedly fetch data and update the component's state.
 */
getDataFromServer() {
  let x = 0; // Initialize a counter to track the number of data fetches

  // Set up an interval that fetches data every 100 milliseconds
  const interval = setInterval(() => {

    // Use DataStreamer to get new data from the server
    DataStreamer.getData((serverResponds: ServerRespond[]) => {

      // Update the component's state with the new data and show the graph
      this.setState({
        data: serverResponds, // Update with the latest server responses
        showGraph: true,      // Set the flag to display the graph
      });
    });

    // Increment the counter after each data fetch
    x++;

    // Stop fetching data after 1000 iterations (to avoid infinite loop)
    if (x > 1000) {
      clearInterval(interval); // Clear the interval to stop data fetching
    }

  }, 100); // Repeat every 100 milliseconds
}


  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
