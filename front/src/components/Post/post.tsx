import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { handleAddComment, handleGetPostData, handleRemoveComment } from '../../lib/api';
import { IComment, IPost } from '../../lib/types';
import { BASE_URL, DEFAULT_PIC } from '../../lib/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface IProps{
    change?: boolean
    postId: number
    handleClose:() => void
}


export function Post({postId, handleClose, change}: IProps) {

    const [text, setText] = useState<string>('')
    const [postData, setPostData] = useState<IPost | null>(null)
    const [error, setError] = useState<string>('')

    useEffect(() => {
      handleGetPostData(postId)
      .then(response => {
        setPostData(response.payload as IPost)
      })
    }, [])


    const onAddComment = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
        if(text.trim()) {
          handleAddComment(text, postId)
          .then((response) => {
              if(postData) {
                setPostData({
                ...postData,
                comments: [
                  ...postData.comments,
                  response.payload as IComment
                ]
              })
            }
              setText('')
              setError('')
          })
        }else {
          setError('error')
        }
    }
   

    const onRemoveComment = (id: number): void => {
      handleRemoveComment(id)
      .then(response => {
          if(response.status == 'ok' && postData) {
            setPostData({
              ...postData,
              comments: postData.comments?.filter(comment => comment.id !== id)
            })
          }
      })
    }

    return (
      <div>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box 
              sx={style}
              style={{display: 'flex', gap: 20, position: 'relative'}}
          >
              <img 
                  src={BASE_URL + postData?.picture}
                  className='post-data-img'
              />

            <h4 className='post-title'>{postData?.title}</h4>  

              <div className='list-data-post'>
                <h5>List of liked</h5>
                  {
                    postData?.likes.map(like => 
                        <div key={like.id}>
                            <p>{like.name} {like.surname}</p>
                        </div>
                    )
                  }
              </div>

                <form className='form-comment' onSubmit={onAddComment}>
                    <textarea
                        className={error && error}
                        value={text}
                        placeholder='Add comment'
                        onChange={event => {
                          setText(event.target.value) 
                        }}
                    />

                    <button className='btn btn-outline-success'>Add</button>
                </form>

                <div className='comment'>
                     {
                      postData?.comments?.map(comment => 
                        <div key={comment.id} className='list-comment'>
                            <img 
                              src={comment.user.picture ? BASE_URL + comment.user.picture : DEFAULT_PIC}
                            />

                            <div>
                                <p>{comment.user.name} {comment.user.surname}</p>
                                <small>{comment.content}</small>
                            </div>
                            

                            {!change && comment.user.id != postData.userId && <button
                                className='btn btn-outline-danger'
                                onClick={() => onRemoveComment(comment.id)}
                            >Delete</button>}
                        </div>
                      )
                     }
                </div>
          </Box>
        </Modal>
      </div>
  );
}