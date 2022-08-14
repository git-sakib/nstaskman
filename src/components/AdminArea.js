import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const AdminArea = (props) => {

    const auth = useSelector((state) => state.auth); 
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.loading)return;
        if (!auth.user) {
            navigate('/login');
        }
    }, [navigate, auth.user]);

    return (
        <div className="admin">
            {props.children}
        </div>
    );
};

export default AdminArea;