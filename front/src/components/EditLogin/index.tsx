import { useForm } from "react-hook-form"
import { ILogin } from "../../lib/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { SchemaLog } from "../../lib/yup"
import { useState } from "react"
import { handleChangeLog } from "../../lib/api"
import { toast } from "react-toastify"
import { MDBInput } from "mdb-react-ui-kit"

export const EditLogin = () => {

    const [error, setError]= useState<string>('')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ILogin>({
        resolver: yupResolver(SchemaLog)
    })

    const onSubmitForLog = (data: ILogin): void => {
        handleChangeLog(data)
        .then(response => {
            if(response.status == 'error' && response.message) {
                setError(response.message)
            }else {
                toast('Login changed')
                reset()
                setError('')
            }
        })
    }

    return (
        <div>
            <h5>Change login</h5>
                <form onSubmit={handleSubmit(onSubmitForLog)}>

                        {error && <p className='text-danger'>{error}</p>}
                        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                
                        <MDBInput
                            wrapperClass='mb-4'
                            type='password'
                            placeholder='Password'
                            {...register('password')}
                        />

                        {errors.login && <p className='text-danger'>{errors.login.message}</p>}

                        <MDBInput
                            wrapperClass='mb-4'
                            type='text'
                            placeholder='New login'
                            {...register('login')}
                        />

                        <button  type='submit' className='btn btn-outline-dark'>Change</button>
                </form>
        </div>
    )
}