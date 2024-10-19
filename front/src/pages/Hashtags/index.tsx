import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { handleGetHashtag } from "../../lib/api"
import { IHash} from "../../lib/types"
import { BASE_URL } from "../../lib/constant"

export const Hashtags = () => {

    const {hash} = useParams()

    const [posts, setPosts] = useState<IHash[]>([])


    useEffect(() => {
        if(hash) {
            handleGetHashtag(hash)
            .then(response => {
                console.log(response.payload)
                setPosts(response.payload as IHash[])
            })
        }
    }, [])

    return (
        <div>
            <h3>Posts in Hashtags</h3>
            {
                posts.map(post => 
                    <div key={post.id}>
                        <img 
                            src={BASE_URL + post.picture}
                            style={{width: 200, height: 200}}
                        />
                        <Link to={`/profile/post/hashtags/${post.title.slice(1)}`}>{post.title}</Link>
                        <p>{post.userId}</p>
                    </div>
                )
            }
        </div>
    )
}