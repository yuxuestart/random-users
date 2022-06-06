import React, {useEffect, useState } from "react";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import useAsyncRequest from "./hooks/useAsyncRequest.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  //useRouteMatch
} from 'react-router-dom';


const App = () => {

  return (
    <Router>
      <div>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        </nav>
        <Routes>
          
          <Route exact path = "/" element = {<Home />} />
            
          <Route exact path = "/search" element = {<Search />} />
            
          <Route exact path = "/about" element = {<About />} />
            
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const api_id = 3;
  const [data, loading] = useAsyncRequest(api_id);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj, i) => {
        return {
          id: i,
          name: obj.name.first,
          username: obj.name.first = " " + obj.name.last,
          city: obj.location.city,
          state: obj.location.state,
          country: obj.location.country,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);


  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

 
  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>

      <div className="row">
        <div >
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        {loading || ! users ? (
          <p>Loading...</p>
        ) : (
          <div >
            <h2>View Users</h2>

            <UserTable 
              users = {users}
              deleteUser = {deleteUser}
              editUser = {editUser}
            />
            
          </div>
        )}
      </div>
    </div>
  );
}

function Search() {

  function changeValue() {
    const api_num = document.getElementById("apiNum").value;
    const url = `https://randomuser.me/api/?results=${api_num}`; 
    let data = null;
    fetch(url)
    .then(response=>response.json())
    .then((dataf)=>{
      data = dataf
      update();
    })
    const update = ()=>{
      document.getElementById("content").innerText = JSON.stringify("name: "+data.results[0].name.first)
      document.getElementById("content1").innerText = JSON.stringify("username: " + data.results[0].name.first + " " + data.results[0].name.last)
      document.getElementById("content2").innerText = JSON.stringify("city: "+data.results[0].location.city)
      document.getElementById("content3").innerText = JSON.stringify("state: "+data.results[0].location.state)
      document.getElementById("content4").innerText = JSON.stringify("country: "+data.results[0].location.country)
      document.getElementById("content5").src = data.results[0].picture.large
    }
  }
 
  return (
    <div>
        <label>Input random user ID information below, you can use the data as information to add the users.:  </label>
        <input id = 'apiNum' type = 'number' 
        placeholder="1" onChange={changeValue}/>
        <p id='content'></p>
        <p id='content1'></p>
        <p id = 'content2'></p> 
        <p id = 'content3'></p>
        <p id = 'content4'></p>
        <img id = 'content5' width='100' height='100'></img>
        
      </div>
  );
}

function About() {
  return (
    <div className="container">
      <h2>About</h2>
      <p>This is the final project for the PromineoTech Front-End training camp I participated in the Spring of 2022. It is a 18-weeks intense coding bootcamp. I learned all the essentials of Front End Software Developer including Javascript, Front End technologies and Web App Design with React.</p>
      <p>For this final project, I used the public API website: https://randomuser.me/api. I used reference from https://dev.to/sanderdebr/creating-a-crud-app-in-react-with-hooks-3jml .</p>

      <footer>Author: Xue Yu</footer>
      <footer>Date: Jun 6, 2022</footer>
    </div>
  )
}

export default App;