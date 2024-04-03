import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';

const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(setUser(""))
        navigate('/login')
    }

    return (
        <>
            <nav class="navbar bg-primary" data-bs-theme="dark">

                {/* <nav class="navbar navbar-expand-lg bg-body-tertiary"> */}
                <div class="container-fluid">
                    <Link to={'/'} class="navbar-brand">Navbar</Link>
                    <div>
                        <NavLink to={'/'} class="navbar-brand nav-item text-white me-3 text-decoration-none ">Home</NavLink>
                        <NavLink to={'/'} class="navbar-brand nav-item text-white me-3 text-decoration-none ">About</NavLink>
                        <NavLink to={'/'} class="navbar-brand nav-item text-white me-3 text-decoration-none ">Career</NavLink>
                    </div>

                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-light text-white  " type="submit">Search</button>
                    </form>
                    {
                        !user && <Link to={"/login"} class="navbar-brand">Log In</Link>
                    }
                    {
                        user && <button onClick={logOut} class="navbar-brand bg-transparent border-0  ">Log Out</button>
                    }


                </div>
            </nav >
            <Outlet />
        </>
    )
}

export default Navbar