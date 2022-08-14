import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import AuthActions from "../state/actions/AuthActions";

const LoginScreen = () => {

    const auth = useSelector((state) => state.auth);
    const [frmData, setFrmData] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate('/dashboard');
        }
    }, [navigate, auth.user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AuthActions.login(frmData));
    };

    return (
        <section className="h-screen login-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img src="/images/login-bg.svg" className="w-full" alt="Phone" />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <h1 className="mt-6 text-4xl tracking-tight font-bold text-green-800 mb-6">TaskMan</h1> <hr />
                        <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">Sign in to your account</h2>
                        <form onSubmit={handleSubmit}> 
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Username"
                                    value={frmData.username}
                                    onChange={(e) => setFrmData(prevState => {
                                        return { ...prevState, username: e.target.value }
                                    })}                            
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    value={frmData.password}
                                    onChange={(e) => setFrmData(prevState => {
                                        return { ...prevState, password: e.target.value }
                                    })}                            
                                />
                            </div>
                            {auth.error &&
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">Authentication Failed !!</span>
                                </div>                            
                            }                            
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light">Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginScreen;