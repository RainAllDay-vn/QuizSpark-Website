
import login_frame from '../../../assets/img/Login Frame.png';
const gridStyle = {
    background: 'repeating-linear-gradient(0deg, #370068 0px, #370068 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #370068 0px, #370068 1px, transparent 1px, transparent 40px)',
    backgroundColor: '#000000',
    backgroundBlendMode: 'overlay',
};

export default function LogInImage() {
    return (
        <div
            className="hidden md:flex relative overflow-hidden"
            style={{ ...gridStyle, width: '66.6667vw', minWidth: '66.6667vw' }}
        >
            <img src={login_frame} alt="Login Frame" className="w-full h-full object-cover" />
        </div>
    );
}