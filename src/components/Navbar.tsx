import { Link } from "react-router";

export default function Navbar(){
    return(
        <div className="flex justify-between bg-black text-white text-xl p-6">
            <h1 className="font-bold text-2xl">
                TaskMaster
            </h1>
            <div className="flex gap-4">
                <Link to='/'>Tasks</Link>
                <Link to='/login'>Login/Signup</Link>
            </div>
        </div>
    )
}
