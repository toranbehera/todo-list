import { Link } from "react-router";
import { selectCurrentUsername } from "../app/features/auth/authSlice";
import { useAppSelector } from "../hooks/reduxHooks";

export default function Navbar(){
    const username = useAppSelector(selectCurrentUsername);

    return(
        <nav className="flex justify-between bg-black text-white text-xl p-6 shadow-lg fixed w-full top-0 z-50">
            <h1 className="font-bold text-2xl">
                TaskMaster
            </h1>
            <div className="flex gap-4">
                <Link to='/'>Tasks</Link>
                <Link to='/login'>{username ? username : "Login/Signup"}</Link>
            </div>
        </nav>
    )
}
