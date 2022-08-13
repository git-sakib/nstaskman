import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const TasksScreen = () => {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user.data) {
            navigate('/login');
        }
    }, [navigate, auth.user.data]);

    return (
        <section className="tasks">
            <hr /> <h2 className="text-xl text-green-900 font-bold">Tasks</h2> <hr />
            <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">ManageTasks</h2>
        </section>
    )
}

export default TasksScreen;