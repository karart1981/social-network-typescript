import { useEffect, useState } from "react"
import { handlePostReaction } from "../../lib/api"
import { BASE_URL, LIKE_BTN, NOT_LIKE_BTN } from "../../lib/constant"
import { IPost } from "../../lib/types"
import { Post } from "../Post/post"
import { Link } from "react-router-dom"



interface IProps {
    posts: IPost[] | undefined
    change?: boolean
    onChangePostStatus?:(id: number) => void
    onDeletePost?:(id: number) => void
    limit: number
}

export const Gallery:React.FC<IProps> = ({posts, change, onChangePostStatus, onDeletePost, limit}) => {

    const [currentPost, setCurrentPost] = useState<number>(-1)
    const [activePage, setActivePage] = useState<number>(1)
    const [show, setShow] = useState<IPost[]>([])
    const [pages, setPages] = useState<number[]>([])

    useEffect(() => {
        const start = (activePage - 1) * limit
        const end = start + limit

        if(posts) {
            setShow(posts.slice(start, end))
            setPages(new Array(Math.ceil(posts.length / limit)).fill(0))
        }


    }, [activePage, posts])

    const reactPost = (id: number): void => {
        handlePostReaction(id)
        .then(() => {
            if(onChangePostStatus) {
                onChangePostStatus(id)
            }
        })
    }

    return (
        <>
            <div className="list">
                {
                    show.map(post => 
                        <div key={post.id} className="post">
                            <img 
                                src={BASE_URL + post.picture}
                                className="post-img"
                             />
                            <div onClick={()=> setCurrentPost(post.id)} className="cover"></div>
                             <img 
                                onClick={() => reactPost(post.id)}
                                className="like-btn"
                                src={
                                    post.isLiked ?
                                    LIKE_BTN :
                                    NOT_LIKE_BTN
                                }
                             />
                            <strong>{post.title} {post.hashtags?.map((hashtag, i) => <Link 
                                                                                        key={i}
                                                                                        to={`/profile/post/hashtags/${hashtag.slice(1)}`}
                                                                                    >{hashtag}</Link>)}</strong>
                            <p><small>{post.likes.length} likes</small></p>
                            {change && <button 
                                            onClick={() => {
                                                if(onDeletePost) {
                                                    onDeletePost(post.id)
                                                }
                                            }}
                                        >Delete</button>}
                        </div>
                    )
                }
            </div>

            {pages.length ? <div className="pagination">
                <button
                    disabled={activePage == 1}
                    onClick={() => setActivePage(activePage - 1)}
                >prev</button>
                {
                    pages.map((_, i) => {
                        return <button 
                                    key={i}
                                    className={i + 1 == activePage ? 'active' : ''}
                                    onClick={() => setActivePage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                    })
                }
                <button
                    disabled={activePage == pages.length}
                    onClick={() => setActivePage(activePage + 1)}
                >next</button>
            </div> : ''}
            
            

            {currentPost != -1 && <Post 
                                        change={change}
                                        postId={currentPost} 
                                        handleClose={() => setCurrentPost(-1)}
                                    />}
        </>
    )
}