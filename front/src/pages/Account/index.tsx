import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { handleBlockUser, handleCancelRequest, handleGetAccount, handleSendFollow, handleUnfollow } from "../../lib/api"
import { IAccount, IContextType } from "../../lib/types"
import { BASE_URL, DEFAULT_PIC, IS_PRIVATE } from "../../lib/constant"
import { Gallery } from "../../components/Gallery/Gallery"

export const Account = () => {

    const {account} = useOutletContext<IContextType>()

    const {id} = useParams()

    const [found, setFound] = useState<IAccount | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        handleGetAccount(id)
        .then(response => {
            if(response.status == 'ok') {
                setFound(response.payload as IAccount)
            }else {
                navigate('/profile')
            }
        })  
    }, [])

    const handleRequest = (): void => {
        if(found) {
            if(found.connection.following) {
                unfollowUser()
            }else if(found.connection.requested) {
                cancelRequest()
            }else {
                followUser()
            }
        }
    }

    const followUser = (): void => {
        if(found && found.id) {
            handleSendFollow(found.id)
            .then(response => {
                if(response.status == 'following') {
                    setFound({
                        ...found,
                        connection: {...found.connection, following: true}
                    })
                }else if(response.status == 'requested') {
                    setFound({
                        ...found,
                        connection: {...found.connection, requested: true}
                    })
                }
            })
        }
    }

    const unfollowUser = (): void => {
        if(found && found.id) {
            handleUnfollow(found.id)
            .then(response => {
                if(response.status == 'unfollowed') {
                    setFound({
                        ...found,
                        connection: {...found.connection, following: false}
                    })
                }
            })
        }
    }

    const cancelRequest = (): void => {
        if(found && found.id) {
            handleCancelRequest(found.id)
            .then(response => {
                if(response.status == 'cancelled') {
                    setFound({
                        ...found,
                        connection: {...found.connection, requested: false}
                    })
                }
            })
        }
    }

    const changePostStatus = (id: number): void => {
        if(found) {
            const temp = {...found}
            const post = temp.posts.find(post => post.id == id)

            if(post?.isLiked) {
                post.likes = post.likes.filter(like => like.id !== account.id)
            }else {
                post?.likes.push(account)
            }

            if(post) {
                post.isLiked = !post.isLiked
            }

            setFound(temp)
        }
    }
    
    
    const onBlockUser = (): void => {
        if(found && found.id) {
                handleBlockUser(found.id)
                .then(response => {
                if(response.message == 'blocked') {
                    setFound({
                        ...found,
                        cover: '',
                        picture: '',
                        posts: [],
                        connection: {...found?.connection, didIBlock: true}
                    })
                }else if(response.message == 'unblocked') {
                    setFound(response.payload as IAccount)
                }
        })
      }
    }


    return (
        <div className="gradient-custom-2 account">
            <div className="list-account">

                <div 
                    className="account-profile"
                    style={{
                        backgroundImage: `url(${found?.cover ?
                            BASE_URL + found.cover : ''
                        })`,
                    }}
                    >
                    <img 
                        src={!found?.picture ? DEFAULT_PIC : BASE_URL + found?.picture}
                        style={{width: 250, height: 250}}
                    />

                    <div>
                        <h3>{found?.name}</h3>
                        <h3>{found?.surname}</h3>
                    </div>

                    <button 
                        className="btn btn-primary"
                        onClick={handleRequest}
                    >
                        {
                            found?.connection.following ?
                            'unfollow' :
                            found?.connection.requested ?
                            'cancel request' :
                            'follow'
                        }
                    </button>

                    {!(found?.connection.blockedMe || found?.connection.amIBlocked)  && (
                    <button
                        className="btn btn-dark"
                        onClick={onBlockUser}
                    >{
                        found?.connection.didIBlock ?
                        'unblock' :
                        'block'
                     }
                    </button>
                    )}
                    
                </div>
                
                <div>   
                    {
                        (found?.connection.blockedMe || found?.connection.amIBlocked) ? 
                        <h2 className="text-posts">You have been blocked</h2> :

                        (found?.isPrivate && !found.connection.following) ? (
                        <>
                            <img 
                                src={IS_PRIVATE}
                                style={{width: 200, height: 200}}
                            />
                            <h5>Account is private</h5>
                        </>
                        )
                        : (
                            <>
                                {found?.posts.length !== 0 ?
                                 <h2 className="text-posts">Posts</h2>
                                : <h2 className="text-posts">Post does not exist</h2>
                                }
                                <Gallery 
                                    limit={6}
                                    posts={found?.posts}
                                    onChangePostStatus={changePostStatus}
                                    />
                            </>
                        )
                    } 
                </div>
            </div>
        </div>
    )
}