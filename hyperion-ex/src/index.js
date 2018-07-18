import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const isLoggedIn = this.props.loggedIn;
    var text = "";
    if(isLoggedIn){
      text = "Welcome to the site";
    } else {
      text = "Not logged in";
    }
    return <div id="header">
      <img
        src="http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg"
        alt="generic logo"
        style={{width:'400px', height:'100px'}}
      ></img>
      <h1>{text}</h1>
    </div>
  }
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return <div>
      <h2>Tasks:</h2>
      <TaskList />
    </div>
  }
}

class Task extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <ul>
      <li>Title: {this.props.title}</li>
      <li>Description: {this.props.description}</li>
      <li>User: {this.props.user}</li>
      <li>Completed: {this.props.completed}</li>
      <li><Button location={"/update/" + this.props.id} name="Create" /></li>
    </ul>
  }
}

class TaskUpdater extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return <form>
      <label>
        Title: <input type="text" name="title" value="Task 4" />
      </label>
      <br/>
      <label>
        Description: <input type="text" name="description" value="About task 4" />
      </label>
      <br/>
      <label>
        User: <input type="text" name="user" value="Daniel" />
      </label>
      <br/>
      <label>
        Completed: <input type="text" name="completed" value="false" />
      </label>
      <br/>
      <input type="submit" value="Submit"/>
    </form>
  }
}

class TaskCreator extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return <form>
      <label>
        Title: <input type="text" name="title" />
      </label>
      <br/>
      <label>
        Description: <input type="text" name="description"/>
      </label>
      <br/>
      <label>
        User: <input type="text" name="user"/>
      </label>
      <br/>
      <label>
        Completed: <input type="text" name="completed"/>
      </label>
      <br/>
      <input type="submit" value="Submit"/>
    </form>
  }
}

class TaskList extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return <div>
      <Task id="1" title="Task 1" description="About task 1" user="Daniel" completed="true" />
      <Task id="2" title="Task 2" description="About task 2" user="Daniel" completed="true" />
      <Task id="3" title="Task 3" description="About task 3" user="Daniel" completed="false" />
    </div>
  }
}

class Menu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var currentPath = window.location.pathname;

    if(currentPath === "/create"){
      return <div>
        <Button location="/" name="Home" />
      </div>
    } else {
      return <div>
        <Button location="/create" name="Create" />
      </div>
    }

  }
}

class Button extends React.Component {
    constructor(props){
      super(props);
    }

    redirect(location){
      window.location.href = location;
    }

    render() {
        return <button type="button" id="thing" onClick={() => this.redirect(this.props.location)}>{this.props.name}</button>
    }
}


const App = () => {
  return (
    <div>
      <BrowserRouter >
        <div>
          <Header loggedIn={false} />
          <Menu />
          <br/>
          <Route path="/create" component={TaskCreator} />
          <Route exact={true} path="/" component={LandingPage} />
          <Route path="/update" component={TaskUpdater} />
        </div>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
