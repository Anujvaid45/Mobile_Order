import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
    return (
        <div>
            <div className="text-center">
            <div className="list-group">
                <NavLink to='/dashboard/user' style={{textDecoration:'none',color:'black'}}><h4>User Panel</h4></NavLink>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
            </div>
            </div>
        </div>
    )
}

export default UserMenu