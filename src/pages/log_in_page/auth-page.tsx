import LogInImage from '@/components/custom/log_in_page/log_in_image';
import { Outlet } from 'react-router-dom';



export function AuthPage() {
    


    return (
        <div className="flex h-screen min-h-[700px] font-sans">
            <LogInImage />
            <Outlet/>
        </div>
    );
}
