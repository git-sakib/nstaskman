import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AdminArea from "../components/AdminArea";
import TaskService from "../services/TaskService";
import MemberService from "../services/MemberService";

const MemberScreen = () => {

    const [members, setMembers] = useState([]); 
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMembers();
    }, []);


    const getMembers = async () => {
        setLoading(true);
        let _members = await MemberService.list();
        setMembers(_members);
        await getTasks();
        setLoading(false);
    };

    const getTasks = async () => {
        let tasks = await TaskService.list();
        setTasks(tasks);
        setLoading(false);
    };

    const getMemberTasks = (member_id) => {
        let count = 0;
        tasks.forEach(task => {
            if(task.member == member_id)count++;
        });
        return count;
    }

    const removeMember = async (id) => {
        setLoading(true);
        await MemberService.remove(id);
        await getMembers();
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
            <section className="members">
                <hr /> <h2 className="text-xl text-green-900 font-bold">Members</h2> <hr />
                <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">Manage Members</h2>
                {msg && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div><p className="font-bold">{msg}</p></div>
                    </div>
                </div>} 
                <hr />
                <div className="table-responsive">
                    <table className="table table-striped mt-6 w-full">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tasks Assigned</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        {!loading && members.length && <tbody>
                            {members.map((member, index) => {
                                return (<tr key={index}><td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-blue-600 underline hover:text-green-900"><Link to={'/members/form/'+member.id}>{member.name}</Link></td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{member.email}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{getMemberTasks(member.id)}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold mt-6 py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={(e) => {
                                        if(window.confirm("Are you sure?") == true){
                                            removeMember(member.id);
                                        }
                                    }}>Delete</button>                                         
                                    </td>
                                </tr>);
                            })}
                        </tbody>}
                    </table>
                </div>


                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold mt-6 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={(e) => {
                    navigate('/members/form');
                }}>Add A New Member</button>            
            </section>
        </AdminArea>
    )
}

export default MemberScreen;