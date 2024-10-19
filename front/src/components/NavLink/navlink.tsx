import React from "react"
import { Link, useLocation } from "react-router-dom"


interface INavLinkProps {
    to: string
    activeClass?: string
    children: React.ReactNode
    end?: boolean
}

export const NavLinkClone:React.FC<INavLinkProps> = ({to, activeClass = 'active', children, end = false}) => {

    const location = useLocation()

    const isActive = end ? location.pathname === to : location.pathname.startsWith(to)

    return (
        <>
            <Link
                to={to}
                className={isActive ? activeClass : ''} 
            >
                {children}
            </Link>
        </>
    )
}