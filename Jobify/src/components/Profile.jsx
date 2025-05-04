import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { fetchPostedJobs, fetchApplicants, deleteJob, updateJob } from "../api/api";

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.data || {};

    const [postedJobs, setPostedJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");

    const [showEditModal, setShowEditModal] = useState(false);
    const [editJobData, setEditJobData] = useState({
        id: "",
        jobTitle: "",
        roleName: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        experience: "",
        jobType: "",
    });


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
            const res = await fetchApplicants(jobId);
            if (!res.ok) throw new Error("Failed to fetch applicants");

            const data = await res.json();
            setApplicants(data);
            setSelectedJobTitle(jobTitle);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch applicants:", error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await deleteJob(jobId);
            setPostedJobs((prev) => prev.filter((job) => job.id !== jobId));
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete the job.");
        }
    };

    const handleUpdateJob = (job) => {
        setEditJobData({
            id: job.id,
            jobTitle: job.jobTitle,
            roleName: job.roleName,
            location: job.location || "",
            salary: job.salary || "",
            description: job.description || "",
            requirements: job.requirements || "",
            experience: job.experience || "entry",
            jobType: job.jobType || "Full time",
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditJobData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateJob(editJobData.id, editJobData);
            alert("Job updated successfully!");
            setShowEditModal(false);

            const res = await fetchPostedJobs(user.id);
            setPostedJobs(res.data);
        } catch (err) {
            console.error("Failed to update job:", err);
            alert("Failed to update job.");
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
                                                <th className="border p-3 text-left">Actions</th>
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
                                                    <td className="border p-3 space-x-4">
                                                        <button onClick={() => handleUpdateJob(job)} title="Edit">
                                                            <FiEdit className="inline cursor-pointer text-blue-600" onClick={() => handleUpdateJob(job)} />
                                                        </button>
                                                        <button onClick={() => handleDeleteJob(job.id)} title="Delete">
                                                            <FiTrash2 className="inline cursor-pointer text-red-600 ml-4" onClick={() => handleDeleteJob(job.id)} />
                                                        </button>
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
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                        <h4 className="text-xl font-semibold mb-4">Applicants for {selectedJobTitle}</h4>
                        {applicants.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse border border-gray-300 rounded">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2 text-left">Name</th>
                                            <th className="border p-2 text-left">Email</th>
                                            {/* <th className="border p-2 text-left">Resume</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicants.map((applicant, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="border p-2">{applicant.name}</td>
                                                <td className="border p-2">{applicant.email}</td>
                                                {/* <td className="border p-2">
                                                    {applicant.resumeUrl ? (
                                                        <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                            View Resume
                                                        </a>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Edit Job - {editJobData.jobTitle}</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Role</label>
                                <input
                                    type="text"
                                    value={editJobData.roleName}
                                    disabled
                                    className="w-full border px-4 py-2 rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editJobData.location}
                                    onChange={handleEditChange}
                                    className="w-full border px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={editJobData.salary}
                                    onChange={handleEditChange}
                                    className="w-full border px-4 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={editJobData.description}
                                    onChange={handleEditChange}
                                    className="w-full border px-4 py-2 rounded"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Requirements</label>
                                <textarea
                                    name="requirements"
                                    value={editJobData.requirements}
                                    onChange={handleEditChange}
                                    className="w-full border px-4 py-2 rounded"
                                    rows={2}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Experience</label>
                                    <select
                                        name="experience"
                                        value={editJobData.experience}
                                        onChange={handleEditChange}
                                        className="w-full border px-4 py-2 rounded"
                                    >
                                        <option value="entry">Entry</option>
                                        <option value="mid">Mid</option>
                                        <option value="senior">Senior</option>
                                        <option value="executive">Executive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Job Type</label>
                                    <select
                                        name="jobType"
                                        value={editJobData.jobType}
                                        onChange={handleEditChange}
                                        className="w-full border px-4 py-2 rounded"
                                    >
                                        <option value="Full time">Full time</option>
                                        <option value="Part time">Part time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
