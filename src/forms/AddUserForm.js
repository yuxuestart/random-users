import React, {useState} from 'react';

const AddUserForm = (props) => {
    const initUser = {id: null, name: '', username: '', city: '', state: '', country: ''};
    const [user, setUser] = useState(initUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (user.name && user.username && user.city && user.state && user.country) {
            handleChange(e, props.addUser(user));
        }
    }

    return (
        <form>
            <div className='row'>
                <div className='four columns'>
                   <label>Name</label>
                   <input className='u-full-width' type = 'text' name = 'name' value = {user.name} placeholder= {user.name} onChange = {handleChange}/>
                </div>
                <div className='four columns' >
                   <label>Username</label>
                   <input className='u-full-width' type = "text" name = 'username' value = {user.username} onChange = {handleChange}/>
                </div>
            </div>
            <div className='row'>
                <div className='four columns'>
                    <label>City</label>
                    <input className='u-full-width' type = "text" name = 'city' value = {user.city} onChange = {handleChange}/>
                </div>
                <div className='four columns'>
                    <label>State</label>
                    <input className='u-full-width' type = "text" name = 'state' value = {user.state} onChange = {handleChange}/>
                </div>
                <div className='four columns'>
                    <label>Country</label>
                    <input className='u-full-width' type = "text" name = 'country' value = {user.country} onChange = {handleChange}/>
                </div>
                
            </div>
            <div>
                <button className='button-primary' type='submit' onClick={handleSubmit}>Add User</button>
            </div>
            
        </form>
    )
}

export default AddUserForm;