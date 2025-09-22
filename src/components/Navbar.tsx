import { Link } from "react-router";

export default function Navbar(){
    return(
        <nav className="flex justify-between bg-black text-white text-xl p-6 shadow-lg fixed w-full top-0 z-50">
            <h1 className="font-bold text-2xl">
                TaskMaster
            </h1>
            <div className="flex gap-4">
                <Link to='/'>Tasks</Link>
                <Link to='/login'>Login/Signup</Link>
            </div>
        </nav>
    )
}
