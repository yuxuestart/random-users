import React, {useState, useEffect} from 'react';

const EditUserForm = (props) => {

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        }    

    const handleSubmit = e => {
        e.preventDefault();
        if (user.name && user.username && user.city && user.state && user.country) props.updateUser(user);
    }

    return (
        <form>
            <label>Name</label>
            <input className="u-full-width" type="text" value={user.name} name="name" onChange={handleChange} />
            <label>Username</label>
            <input className="u-full-width" type="text" value={user.username} name="username" onChange={handleChange} />
            <label>City</label>
            <input className="u-full-width" type="text" value={user.city} name="city" onChange={handleChange} />
            <label>State</label>
            <input className="u-full-width" type="text" value={user.state} name="state" onChange={handleChange} />
            <label>Country</label>
            <input className="u-full-width" type="text" value={user.country} name="country" onChange={handleChange} />
            
            <button className="button-primary" type="submit" onClick={handleSubmit} >Edit user</button>
            <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditUserForm;