import { useEffect, useState } from "react"
import { handleAccept, handleDecline, handleRequests } from "../../lib/api"
import { IContextType, IRequest, IUser } from "../../lib/types"
import { toast } from "react-toastify"
import { useOutletContext } from "react-router-dom"

export const Requests = () => {
    const {account, setAccount} = useOutletContext<IContextType>()

    const [requests, setRequests] = useState<IRequest[]>([])

    useEffect(() => {
        handleRequests()
        .then(response => {
            if(response.status === 'ok') {
                setRequests(response.payload as IRequest[])      
            }
        })
    }, [])


    const onAccept = (id: number): void => {
        handleAccept(id)
        .then(response => {
            if(response.status == 'ok') {
                const temp = requests.find(request => request.id == id)

                setRequests(requests.filter(request => request.id != id))
                
                setAccount({
                    ...account,
                    followers: [...account.followers, temp?.user as IUser]
                })
                toast('Accepted')
            }
        })
    }

    const onDecline = (id: number): void => {
        handleDecline(id)
        .then(response => {
            if(response.status == 'ok') {
                setRequests(requests.filter(request => request.id != id))
                toast('Cancelled')
            }
        })
    }

    return (
        <div className="gradient-custom-2 requests">
            <h2>Requests</h2>

            <div className="block-requests">
                {
                    requests.map(request => 
                        <div className="list-request" key={request.id}>
                            <p>{request.user.name} {request.user.surname}</p>
                            <button 
                                className="btn btn-outline-success"
                                onClick={() => onAccept(request.id)}
                            >accept</button>
                            <button 
                                className="btn btn-outline-danger"
                                onClick={() => onDecline(request.id)}
                            >decline</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}