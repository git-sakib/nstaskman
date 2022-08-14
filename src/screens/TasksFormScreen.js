import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import TaskService from "../services/TaskService";
import MemberService from "../services/MemberService";
import AdminArea from "../components/AdminArea";
import moment from 'moment';

const TasksFormScreen = () => {

    const [task, setTask] = useState({
        id: 0,
        title: "",
        description: "",
        member: 0,
        created: moment().format("YYYY-MM-DD")
    }); 
    const [members, setMembers] = useState([]); 
    const [frmError, setFromError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [msg, setMsg] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if(id && mode === 0){
            setLoading(true); 
            setMode(1);
            getTask(id);
        }
        getMemberList();
    }, []);

    const getMemberList = async () => {
        let _members = await MemberService.list();
        setMembers(_members);
        setLoading(false);
        //console.log(task);
    };

    const getTask = async (id) => {
        let task = await TaskService.get(id);
        setTask(task);
        setLoading(false);
        //console.log(task);
    };

    const saveTask = (e) => {
        e.preventDefault();
        if(task.title == "" || task.title == null){
            setFromError(true);
            return;
        }
        setLoading(true);
        if(mode == 0){
            addTask(task);
        } else {
            editTask(task);
        }
    }

    const addTask = async (data) => {
        await TaskService.add(data);
        setLoading(false);
        setMsg('Operation complete successfully !!');
        navigate('/tasks');
    }

    const onChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    const editTask = async (data) => {
        await TaskService.edit(data);
        setLoading(false);
        setMsg('Operation complete successfully !!');
        setTimeout(() => {
            navigate('/tasks');
        }, 1000);
    }    

    return (
        <AdminArea>
			{loading && <div className="loading">
				<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
					<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
					<h2 className="text-center text-white text-xl font-semibold">Loading ...</h2>
				</div>				
			</div>}
            <section className="tasks">
                <hr /> <h2 className="text-xl text-green-900 font-bold">Tasks</h2> <hr />
                <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">{mode == 0 ? 'Add New Task' : 'Edit Task'}</h2>
                {msg && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div><p className="font-bold">{msg}</p></div>
                    </div>
                </div>}               
                <hr />
                <form className="w-full max-w-3xl mt-6" onSubmit={saveTask}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="task-title">Task Title <sup className="text-red-500 text-xs italic">*</sup></label>
                            <input value={task.title} onChange={onChange} name="title" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="task-title" type="text" placeholder="Title ..." />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="task-member">Assign to Member</label>
                            <div className="relative">
                                <select onChange={(e) => {
                                    setTask({
                                        ...task,
                                        member: e.target.value
                                    });                                    
                                }} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="task-member">
                                    <option value={mode === 1 ? task.member : '0'}>{
                                        mode === 1 ? 
                                        (members.find(x => x.id === task.member) ? members.find(x => x.id === task.member).name : 'Not found') : 
                                        'Not Assigned'
                                    }</option>
                                    {members.length && members.map((member, index) => {
                                        return <option key={index} value={member.id}>{member.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="task-description">Task Detail</label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows={8} id="task-description" type="text" name="description" value={task.description} placeholder="Task Detail ..." onChange={onChange}></textarea>
                        </div>
                    </div>

                    {frmError && <p className="text-red-500 text-xs italic mb-10">Please fill out the required fields.</p>}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Save Task</button>
                
                </form>

            </section>
        </AdminArea>
    )
}

export default TasksFormScreen;