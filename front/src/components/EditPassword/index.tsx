import { useForm } from "react-hook-form"
import { IChangePwd } from "../../lib/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { SchemaPwd } from "../../lib/yup"
import { handleChangePwd } from "../../lib/api"
import { useState } from "react"
import { toast } from "react-toastify"
import { MDBInput } from "mdb-react-ui-kit"

export const EditPassword = () => {

    const [error, setError] = useState<string>('')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IChangePwd>({
        resolver: yupResolver(SchemaPwd)
    })

    const onSubmitForPwd = (data: IChangePwd): void => {
        handleChangePwd(data)
        .then(response => {
            if(response.status == 'error' && response.message) {
                setError(response.message)
            }else {
                toast('Password changed')
                reset()
                setError('')
            }
        })
    }

    return (
        <div>
            <h5>Change password</h5>
                            <form onSubmit={handleSubmit(onSubmitForPwd)}>

                                {error && <p className='text-danger'>{error}</p>}
                                {errors.old && <p className='text-danger'>{errors.old.message}</p>}
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='password'
                                    placeholder='Old password'
                                    {...register('old')}
                                />

                                {errors.newpwd && <p className='text-danger'>{errors.newpwd.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='password'
                                    placeholder='New password'
                                    {...register('newpwd')}
                                />

                                <button  type='submit' className='btn btn-outline-dark'>Change</button>
                            </form>
        </div>
    )
}