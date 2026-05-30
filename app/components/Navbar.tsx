// import { Link } from "react-router";
//
// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <Link to="/">
//                 <p className="text-2xl font-bold text-gradient">
//                     RESUMIND
//                 </p>
//             </Link>
//
//             <Link to="/upload" className="primary-button w-fit">
//                 Upload Resume
//             </Link>
//         </nav>
//     );
// };
//
// export default Navbar;


import { Link } from "react-router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePuterStore } from "../lib/puter";

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { auth } = usePuterStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>

            <div className="flex items-center gap-3">


                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:scale-110 transition-all duration-200"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                )}

                {auth.isAuthenticated && (
                    <button
                        onClick={auth.signOut}
                        className="text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                        Log out
                    </button>
                )}

                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;