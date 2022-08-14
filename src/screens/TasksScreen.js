import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TaskService from "../services/TaskService";
import MemberService from "../services/MemberService";
import AdminArea from "../components/AdminArea";
import moment from 'moment';

const TasksScreen = () => {

    const [tasks, setTasks] = useState([]); 
    const [members, setMembers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    }, []);


    const getTasks = async () => {
        setLoading(true);
        let tasks = await TaskService.list();
        setTasks(tasks);
        await getMembers();
        setLoading(false);
    };

    const getMembers = async () => {
        setLoading(true);
        let _members = await MemberService.list();
        setMembers(_members);
        setLoading(false);
    };

    const removeTask = async (id) => {
        setLoading(true);
        await TaskService.remove(id);
        await getTasks();
        setLoading(false);
        setMsg('Operation complete successfully !!');
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
                <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">ManageTasks</h2>
                {msg && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div><p className="font-bold">{msg}</p></div>
                    </div>
                </div>} 
                <hr />
                <button className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={(e) => {
                    navigate('/tasks/form');
                }}>Add A New Task</button>

                <div className="table-responsive">
                    <table className="table table-striped mt-6 w-full">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Craeted</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assigned To</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        {tasks.length && <tbody>
                            {tasks.map((task, index) => {
                                return (<tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-blue-600 underline hover:text-green-900"><Link to={'/tasks/form/'+task.id}>{task.title}</Link></td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{task.description}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{moment(task.created).format("YYYY-MM-DD")}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{task.member === 0 ? 'Not Assigned' : (members.find(x => x.id === task.member) === undefined ? 'Not Found' : members.find(x => x.id === task.member).name)}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button className="bg-red-500 hover:bg-red-400 text-white font-bold mt-6 py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={(e) => {
                                            if(window.confirm("Are you sure?") == true){
                                                removeTask(task.id);
                                            }
                                        }}>Delete</button>                                          
                                    </td>
                                </tr>);
                            })}
                        </tbody>}
                    </table>
                </div>

            </section>
        </AdminArea>
    )
}

export default TasksScreen;