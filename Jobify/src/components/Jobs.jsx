import { useState, useEffect, useCallback } from 'react';
import { Briefcase, DollarSign, MapPin, Search, Filter } from 'lucide-react';
import Navbar from './Navbar';
import JobList from './JobList';

function Jobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('full-time');
    const [experience, setExperience] = useState('entry');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobListings, setJobListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const jobsPerPage = 10;

    const handleSearch = useCallback(async () => {
        try {
            // const token = await getAccessTokenSilently({
            //     authorizationParams: {
            //         audience: "https://dev-js62l7dyu6g81sdx.us.auth0.com/api/v2/",
            //         scope: "read:jobs"
            //     }
            // });
            // console.log("Token:", token);
            // console.log("JWT Token Length:", token.length);

            const query = new URLSearchParams({
                searchTerm,
                location,
                jobType,
                experience,
                salaryRange,
                page: currentPage,
            }).toString();

            const response = await fetch(`http://localhost:8080/api/jobs?${query}`,
                {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const text = await response.text(); 
            const data = text ? JSON.parse(text) : {}; 

            setJobListings(data.jobs || []);
            setTotalJobs(data.total || 0);
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }        
    }, [searchTerm, location, jobType, experience, salaryRange, currentPage]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchTerm') setSearchTerm(value);
        else if (name === 'location') setLocation(value);
        else if (name === 'jobType') setJobType(value);
        else if (name === 'experience') setExperience(value);
        else if (name === 'salaryRange') setSalaryRange(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Your Dream Job</h2>

                        {/* Search Bar */}
                        <div className="flex mb-8">
                            <input
                                type="text"
                                name="searchTerm"
                                value={searchTerm}
                                onChange={handleChange}
                                placeholder="Search for jobs..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md flex items-center"
                            >
                                <Search className="h-5 w-5" />
                                <span className="ml-2">Search</span>
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex space-x-6 mb-8">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="salaryRange"
                                    value={salaryRange}
                                    onChange={handleChange}
                                    placeholder="Salary Range"
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <select
                                    name="jobType"
                                    value={jobType}
                                    onChange={handleChange}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Briefcase className="h-5 w-5 text-gray-400" />
                                <select
                                    name="experience"
                                    value={experience}
                                    onChange={handleChange}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                                >
                                    <option value="entry">Entry Level</option>
                                    <option value="mid">Mid Level</option>
                                    <option value="senior">Senior Level</option>
                                </select>
                            </div>
                        </div>

                        {/* Job Listings */}
                        <JobList
                            jobListings={jobListings}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />

                        {/* Job Role Recommendations */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Job Roles</h3>
                            <ul className="space-y-4">
                                <li className="border-b pb-4">
                                    <h4 className="text-xl font-semibold">Software Engineer</h4>
                                    <p className="text-gray-600">Build and maintain software applications.</p>
                                </li>
                                <li className="border-b pb-4">
                                    <h4 className="text-xl font-semibold">Data Scientist</h4>
                                    <p className="text-gray-600">Analyze and interpret complex data to drive business decisions.</p>
                                </li>
                                <li className="border-b pb-4">
                                    <h4 className="text-xl font-semibold">Product Manager</h4>
                                    <p className="text-gray-600">Manage the development and lifecycle of a product.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Jobs;
