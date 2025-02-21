import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { User, Briefcase, PlusCircle } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Brand Name */}
                    <div className="flex items-center">
                        <h1 
                            className="ml-3 text-2xl font-bold text-gray-900 cursor-pointer"
                            onClick={() => navigate('/home')}
                        >
                            Jobify
                        </h1>
                    </div>

                    {/* Centered Navigation Buttons */}
                    <div className="flex space-x-4 items-center absolute left-1/2 transform -translate-x-1/2">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                            onClick={() => navigate('/jobs')}
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Browse Jobs
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => navigate('/recruit')}
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Post a Job
                        </button>
                    </div>

                    {/* Authentication Buttons */}
                    <div className="flex space-x-4 items-center">
                        {!isAuthenticated ? (
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                onClick={() => loginWithRedirect()}
                            >
                                Login
                            </button>
                        ) : (
                            <>
                                {/* Profile Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => navigate('/profile')}
                                >
                                    <User className="w-6 h-6 mr-2" />
                                    {user.name}
                                </button>

                                {/* Logout Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
