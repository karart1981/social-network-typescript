import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"
import { useNavigate } from "react-router-dom"

export const Search = () => {

    const [users, setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>('') 

    const navigate = useNavigate()

    useEffect(() => {
        if(!text.trim()) {
            setUsers([])
        }else {
            handleSearch(text)
            .then(response => {
                setUsers(response.payload as IUser[])
            })
        }

    }, [text])

    return (
        <div className="gradient-custom-2 search">

            <div className="list-search">
                <h2>Search</h2>

                <input 
                    type="text"
                    placeholder="Search for a friends..."
                    className="form-control"
                    value={text}
                    onChange={event => setText(event.target.value)}
                />


                {users.length > 0 && <small>{users.length} users found!</small>}

                <div className="list search">
                    {
                        users.map(user => 
                            <div key={user.id}>
                                <img 
                                    src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                                />

                                <p>{user.name} {user.surname}</p>

                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => navigate(`/profile/${user.id}`)}
                                >Profile</button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}