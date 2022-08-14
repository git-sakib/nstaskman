import { useEffect } from "react";
import AdminArea from "../components/AdminArea";

const DashboardScreen = () => {

    useEffect(() => {
    }, []);

    return (
        <AdminArea>
            <section className="dashboard">
                <hr /> <h2 className="text-xl text-green-900 font-bold">Dashboard</h2> <hr />
                <h2 className="mt-6 text-3xl tracking-tight font-bold text-gray-900 mb-10">Welcome to Admin area</h2>
            </section>
        </AdminArea>
    )
}

export default DashboardScreen;