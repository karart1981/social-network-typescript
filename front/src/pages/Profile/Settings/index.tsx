import { EditLogin } from '../../../components/EditLogin'
import { EditPassword } from '../../../components/EditPassword'
import { EditPrivacy } from '../../../components/EditPrivacy'


export const Settings = () => {


    return (
        <div className="gradient-custom-2 settings" style={{ backgroundColor: '#9de2ff' }}>
                <div className='block'>
                    <h2>Settings</h2>
                    <EditPassword />
                    <EditLogin />
                    <EditPrivacy />
                </div>
        </div>
    )
}