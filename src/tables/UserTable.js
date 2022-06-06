import React from 'react';
const UserTable = (props) => {
    return (
        <table className='bordered condensed zebra-striped'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, name, username, city, state, country} = user;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{username}</td>
                                <td>{city}</td>
                                <td>{state}</td>
                                <td>{country}</td>
                                <td>
                                    <button onClick={() => props.deleteUser(id)}>Delete</button>
                                    <button onClick = {() => props.editUser(id, user)}>Edit</button>
                                </td>
                            </tr>  
                             
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )}
                
            </tbody>
        </table>
    )
}

export default UserTable;