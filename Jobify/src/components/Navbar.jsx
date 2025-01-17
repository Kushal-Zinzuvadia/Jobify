import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="ml-3 text-2xl font-bold text-gray-900">Jobify</h1>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                            onClick={() => navigate('/jobs')}
                        >
                            Browse Jobs
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => navigate('/recruit')}
                        >
                            Post a Job
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
