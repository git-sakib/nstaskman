import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AuthActions from "../state/actions/AuthActions";

const Header = () => {

    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <>
            {auth.user && <header className="header">
                <nav className="flex items-center justify-between flex-wrap bg-green-900 p-6">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span className="font-semibold text-xl tracking-tight">TaskMan</span>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-end lg:w-auto items-end">
                        <div className="text-sm lg:flex-grow">
                        </div>
                        <div>
                            <Link to='/dashboard' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Dashboard</Link>
                            <Link to='/tasks' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Tasks</Link>
                            <Link to='/members' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Members</Link>
                            |
                            <span className="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 ml-4 mr-4">Welcome {auth.user && auth.user.name}</span>
                            <button onClick={() => {
                                dispatch(AuthActions.logout());
                            }} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
                        </div>
                    </div>
                </nav>
            </header>}       
        </>
    );
}

export default Header;