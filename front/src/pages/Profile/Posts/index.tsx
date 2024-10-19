import { useEffect, useRef, useState } from "react"
import { handleDeletePost, handleGetPosts, handlePostCreation } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/Gallery/Gallery"

export const Posts = () => {

    const [lists, setLists]= useState<IPost[]>([])
    const [text, setText] = useState<string>('')

    const change = true

    const photo = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        handleGetPosts()
        .then(response => {
            setLists(response.payload as IPost[])
        })
    }, [])

    const onDeletePost = (id: number): void => {
        handleDeletePost(id)
        .then(response => {
            setLists(lists.filter(list => list.id != response.payload))
        })
    }

    const handleUpload = (): void => {
        if(photo.current) {
            const file = photo.current.files?.[0]

            if(file) {
                const form = new FormData()
                form.append('photo', file)
                form.append('content', text)

                handlePostCreation(form)
                .then(response => {
                    setLists([...lists, response.payload as IPost])
                    setText('')
                })
            }
        }
    }


    return (
        <div className="gradient-custom-2 posts">
            <div className="list-posts">
            <h2>Posts</h2>

            <div>
                    <input 
                        type="file"
                        style={{display: 'none'}}
                        ref={photo}
                        onChange={handleUpload}
                        />

                    <input 
                        type="text"
                        className="form-control"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={event => setText(event.target.value)}
                    />

                    <button 
                        className="btn btn-outline-success"
                        onClick={() => photo.current?.click()}
                        >Upload</button>
            </div>

                <Gallery 
                    limit={6}
                    posts={lists} 
                    change={change}
                    onDeletePost={onDeletePost}
                    />
            </div>
        </div>
    )
}