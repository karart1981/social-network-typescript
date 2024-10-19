import { useEffect, useState } from "react"
import { handleGetFollowers } from "../../lib/api"
import { IUser } from "../../lib/types"
import { BASE_URL, DEFAULT_PIC } from "../../lib/constant"
import { useNavigate } from "react-router-dom"

export const Followers = () => {

    const navigate = useNavigate()

    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
        handleGetFollowers()
        .then(response => {
            setFollowers(response.payload as IUser[])
        })
    }, [])

    return (
        <div className="gradient-custom-2 followers">
            <div className="list-followers">
                <h3>Followers</h3>

                <div className="block-followers">
                    {
                        followers.map(follower => 
                            <div key={follower.id} className="follower">

                                
                                    <img 
                                        src={follower.picture ? BASE_URL + follower.picture : DEFAULT_PIC}
                                    />

                                    <p>{follower.name} {follower.surname}</p>

                                    <button
                                        className="btn btn-outline-dark"
                                        onClick={() => navigate(`/profile/${follower.id}`)}
                                    >Profile</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}