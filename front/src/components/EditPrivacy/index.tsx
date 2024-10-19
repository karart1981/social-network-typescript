import { useOutletContext } from "react-router-dom"
import { IContextType } from "../../lib/types"
import { ACCOUNT_PRIVATE, ACCOUNT_PUBLIC } from "../../lib/constant"
import { handleSetPrivacy } from "../../lib/api"
import { toast } from "react-toastify"


export const EditPrivacy = () => {
    const {account, setAccount} = useOutletContext<IContextType>()

    const onChangePrivacy = (): void => {
        handleSetPrivacy()
        .then(response => {
            setAccount({...account, isPrivate: response.payload as boolean})
            toast(!account.isPrivate ? 'The account has become private.' : 'The account has become open')
        })
    }
    
    return (
        <div>
            <h5>Edit Privacy</h5>
            
            <div className="isPrivacy">
            <button 
                className={account.isPrivate ? "btn btn-outline-danger" : "btn btn-outline-success"}
                onClick={onChangePrivacy}
                >{account.isPrivate ? 'Private' : 'Public'}</button>
                <img 
                    src={account.isPrivate ? ACCOUNT_PRIVATE : ACCOUNT_PUBLIC}
                    style={{width: 35, height: 35}}
                />
            </div>
        </div>
    )
}