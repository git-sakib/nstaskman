import { useSelector } from "react-redux";

const Footer = () => {

    const auth = useSelector((state) => state.auth);

    return (
        <>
            {auth.user && <footer className="footer">
                <div className="block bg-gray-900 p-6">
                    <div className="text-white mr-6 text-center">
                        <span className="font-semibold text-sm tracking-tight">no copytright, anyone free to copy! - TaskMan</span>
                    </div>
                </div>
            </footer>}       
        </>
    );
}

export default Footer;