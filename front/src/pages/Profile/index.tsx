import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { handlelogout, handleVerify } from "../../lib/api"
import { IWideUser } from "../../lib/types"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLinkClone } from "../../components/NavLink/navlink";

export const Profile = () => {

    const navigate = useNavigate()

    const [account, setAccount] = useState<IWideUser | null>(null)

    useEffect(() => {
        handleVerify()
        .then(response => {
            if(!response.user) {
                navigate('/login')
            }else {
                setAccount(response.user)
            }
        })
    }, [])

    const onLogout = (): void => {
        handlelogout()
        .then(response => {
            if(response.status == 'ok') {
                navigate('/login')
            }
        })
    }
    
    return account && (
        <>
            <nav>
                <NavLinkClone to='/profile' end>Profile</NavLinkClone>
                <NavLinkClone to='/profile/settings'>Settings</NavLinkClone>
                <NavLinkClone to='/profile/search'>Search</NavLinkClone>
                <NavLinkClone to='/profile/posts'>Posts</NavLinkClone>
                <NavLinkClone to='/profile/followers'>Followers</NavLinkClone>
                <NavLinkClone to='/profile/following'>Following</NavLinkClone>
                {account.isPrivate ? <NavLinkClone to='/profile/requests'>Requests</NavLinkClone> : ''}
                <button onClick={onLogout}>Logout</button>
            </nav>

            <Outlet 
                context={{account, setAccount}}
            />

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}