import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from "../../lib/types"
import { handleGetFollowing } from "../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../lib/constant"

export const Following = () => {
    const navigate = useNavigate()

    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
        handleGetFollowing()
        .then(response => {
            setFollowers(response.payload as IUser[])
        })
    }, [])

    return (
        <div className="gradient-custom-2 followers">
            <div className="list-followers">
                <h3>Following</h3>

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
