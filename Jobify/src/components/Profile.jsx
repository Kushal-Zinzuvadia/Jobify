import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { fetchPostedJobs, fetchApplicants } from "../api/api";

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.data || {};

    const [postedJobs, setPostedJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");

    useEffect(() => {
        const loadPostedJobs = async () => {
            try {
                const response = await fetchPostedJobs(user.id);
                const jobs = response.data;

                if (Array.isArray(jobs)) {
                    setPostedJobs(jobs);
                } else {
                    console.error("Expected an array but got:", jobs);
                    setPostedJobs([]);
                }
            } catch (error) {
                console.error("Error fetching posted jobs:", error);
            }
        };

        if (user.roleName === "EMPLOYER") {
            loadPostedJobs();
        }
    }, [user.id, user.roleName]);

    const handleApplicantsClick = async (jobId, jobTitle) => {
        try {
            const data = await fetchApplicants(jobId);
            setApplicants(data);
            setSelectedJobTitle(jobTitle);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch applicants:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-5xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-700 text-lg">
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p className="text-gray-700 text-lg">
                                <strong>Email:</strong> {user.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg">
                                <strong>Role:</strong> {user.roleName}
                            </p>
                            <p className="text-gray-700 text-lg">
                                <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {user.roleName === "JOB_SEEKER" ? (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Applied Jobs</h3>
                            {user.jobs && user.jobs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border p-3 text-left">Job Title</th>
                                                <th className="border p-3 text-left">Company</th>
                                                <th className="border p-3 text-left">Location</th>
                                                <th className="border p-3 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.jobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-gray-100">
                                                    <td className="border p-3">{job.jobTitle}</td>
                                                    <td className="border p-3">{job.company}</td>
                                                    <td className="border p-3">{job.location}</td>
                                                    <td className="border p-3 text-green-600 font-medium">Applied</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">You haven&apos;t applied for any jobs yet.</p>
                            )}
                        </>
                    ) : user.roleName === "EMPLOYER" ? (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Posted Jobs</h3>
                            {Array.isArray(postedJobs) && postedJobs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border p-3 text-left">Job Title</th>
                                                <th className="border p-3 text-left">Location</th>
                                                <th className="border p-3 text-left">No. of Applicants</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {postedJobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-gray-100">
                                                    <td className="border p-3">{job.jobTitle}</td>
                                                    <td className="border p-3">{job.location}</td>
                                                    <td
                                                        className="border p-3 text-blue-600 font-medium cursor-pointer"
                                                        onClick={() => handleApplicantsClick(job.id, job.jobTitle)}
                                                    >
                                                        {job.users ? job.users.length : 0} Applicants
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">You haven&apos;t posted any jobs yet.</p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-600">ADMIN role.</p>
                    )}
                </div>
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h4 className="text-xl font-semibold mb-4">Applicants for {selectedJobTitle}</h4>
                        {applicants.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {applicants.map((applicant, idx) => (
                                    <li key={idx}>
                                        {applicant.name} – {applicant.email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No applicants found.</p>
                        )}
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
