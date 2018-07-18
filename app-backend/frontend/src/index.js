import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  login(){
    localStorage.setItem('loggedIn', true);
    window.location.href = '/';
  }

  logout(){
    localStorage.setItem('loggedIn', false);
    window.location.href = '/';
  }

  render(){
    var response;
    if(localStorage.getItem('loggedIn') == 'true'){
      response = <div>
        <h1>Welcome to the site</h1>
        <button type="button" onClick={() => this.logout()}>Log out</button>
      </div>
    } else {
      response = <div>
        <h3>Please log in</h3>
        <button type="button" onClick={() => this.login()}>Log in</button>
      </div>
    }
    return <div id="header">
      <img
        src="http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg"
        alt="generic logo"
        style={{width:'400px', height:'100px'}}
      ></img>
      {response}
    </div>
  }
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {deadline: new Date()};
  }

  redirect(location){
    window.location.href = location;
  }

  handleDeadlineChange = (e) => {
    this.setState({deadline: e.target.value});
  }

  render(){
    return <div>
      <h2>Filters</h2>
      <button type="button" onClick={() => this.redirect("/?filter=completed")}>Completed</button>
      <button type="button" onClick={() => this.redirect("/?filter=incomplete")}>Incomplete</button>
      <button type="button" onClick={() => this.redirect("/?filter=overdue")}>Overdue</button>

      <br/><br/>

      <button type="button" onClick={() => this.redirect("/?filter=deadline&deadline=" + this.state.deadline)}>Deadline:</button>
      <br/>
      <label>
        Deadline: <input type="text" name="deadline" value={this.state.deadline} onChange={this.handleDeadlineChange} />
      </label>

      <br/>
      <h2>Tasks:</h2>
      <TaskList pathName={this.props.location.search} />
    </div>
  }
}

class Task extends React.Component {
  constructor(props){
    super(props);
  }

  handleComplete = (id) => {
    fetch('/task/complete/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      window.location.href = '/'
    })
    .catch(err => console.error(this.props.url, err.toString()))
  }

  render(){
    return <ul>
      <li>Title: {this.props.title}</li>
      <li>Description: {this.props.description}</li>
      <li>User: {this.props.user}</li>
      <li>Completed: {this.props.completed}</li>
      <li>Deadline: {this.props.end_date}</li>
      <li><Button location={"/update/" + this.props.id} name="Update" /></li>
      <li><button type="button" onClick={() => this.handleComplete(this.props.id)}>Complete</button></li>
    </ul>
  }
}

class TaskUpdater extends React.Component {
  constructor(props){
    super(props);
    this.state = { data: {} }
  }

  loadData() {
    fetch('/task/' + this.props.location.pathname.replace("/update/", ""))
      .then(response => response.json())
      .then(data => {
        this.setState({data: data })
    })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentWillMount() {
    this.loadData()
  }

  handleTitleChange = (e) => {
    var task = this.state.data;
    task.title = e.target.value;
    this.setState({data: task});
  }

  handleDescriptionChange = (e) => {
    var task = this.state.data;
    task.description = e.target.value;
    this.setState({data: task});
  }

  handleUserChange = (e) => {
    var task = this.state.data;
    task.user = e.target.value;
    this.setState({data: task});
  }

  handleCompletedChange = (e) => {
    var task = this.state.data;
    task.completed = e.target.value;
    this.setState({data: task});
  }

  handleEndDateChange = (e) => {
    var task = this.state.data;
    task.end_date = e.target.value;
    this.setState({data: task});
  }

  handleSubmit = () => {
    var task = this.state.data;
    task._id = this.props.location.pathname.replace("/update/", "");

    console.log(task);
    fetch('/task/' + this.props.location.pathname.replace("/update/", ""), {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => {
      window.location.href = '/'
    })
    .catch(err => console.error(this.props.url, err.toString()))
  }

  render() {
    return <form>
      <label>
        Title: <input type="text" name="title" value={this.state.data ? this.state.data.title : ''} onChange={this.handleTitleChange} />
      </label>
      <br/>
      <label>
        Description: <input type="text" name="description" value={this.state.data ? this.state.data.description : ''} onChange={this.handleDescriptionChange} />
      </label>
      <br/>
      <label>
        User: <input type="text" name="user" value={this.state.data ? this.state.data.user : ''} onChange={this.handleUserChange} />
      </label>
      <br/>
      <label>
        Completed: <input type="text" name="completed" value={this.state.data ? this.state.data.completed : ''} onChange={this.handleCompletedChange} />
      </label>
      <br/>
      <label>
        Deadline: <input type="text" name="end_date" value={this.state.data ? this.state.data.end_date : ''} onChange={this.handleEndDateChange} />
      </label>
      <br/>
      <button type="button" onClick={this.handleSubmit}>Submit</button>
    </form>
  }
}

class TaskCreator extends React.Component {
  constructor(props){
    super(props);
    this.state = { data: {} }
  }

  handleTitleChange = (e) => {
    var task = this.state.data;
    task.title = e.target.value;
    this.setState({data: task});
  }

  handleDescriptionChange = (e) => {
    var task = this.state.data;
    task.description = e.target.value;
    this.setState({data: task});
  }

  handleUserChange = (e) => {
    var task = this.state.data;
    task.user = e.target.value;
    this.setState({data: task});
  }

  handleCompletedChange = (e) => {
    var task = this.state.data;
    task.completed = e.target.value;
    this.setState({data: task});
  }

  handleEndDateChange = (e) => {
    var task = this.state.data;
    task.end_date = e.target.value;
    this.setState({data: task});
  }

  handleSubmit = () => {
    var task = this.state.data;

    console.log(task);
    fetch('/task', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => {
      window.location.href = '/'
    })
    .catch(err => console.error(this.props.url, err.toString()))
  }

  render() {
    return <form>
      <label>
        Title: <input type="text" name="title" value={this.state.data ? this.state.data.title : ''} onChange={this.handleTitleChange} />
      </label>
      <br/>
      <label>
        Description: <input type="text" name="description" value={this.state.data ? this.state.data.description : ''} onChange={this.handleDescriptionChange} />
      </label>
      <br/>
      <label>
        User: <input type="text" name="user" value={this.state.data ? this.state.data.user : ''} onChange={this.handleUserChange} />
      </label>
      <br/>
      <label>
        Completed: <input type="text" name="completed" value={this.state.data ? this.state.data.completed : ''} onChange={this.handleCompletedChange} />
      </label>
      <br/>
      <label>
        Deadline: <input type="text" name="end_date" value={this.state.data ? this.state.data.end_date : ''} onChange={this.handleEndDateChange} />
      </label>
      <br/>
      <button type="button" onClick={this.handleSubmit}>Submit</button>
    </form>
  }
}

class TaskList extends React.Component {
  constructor(props){
    super(props);
    this.state = { data: [] }
  }

  loadData() {
    fetch('/task' + this.props.pathName)
      .then(response => response.json())
      .then(data => {
        this.setState({data: data })
    })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return <div>
      { this.state.data.map((item, i) => {
        return <Task key={item._id} id={item._id} title={item.title} description={item.description} user={item.user} completed={item.completed} end_date={item.end_date} />
        })
      }
    </div>;
  }
}

class Menu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var currentPath = window.location.pathname;

    if(currentPath === "/"){
      return <div>
        <Button location="/create" name="Create" />
      </div>
    } else {
      return <div>
        <Button location="/" name="Home" />
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
          <Header />
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
