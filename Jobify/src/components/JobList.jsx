import PropTypes from 'prop-types';

const JobList = ({ jobListings, totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Job Listings as Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobListings.map((job, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-500 mt-2 line-clamp-2">{job.summary}</p>

            {/* Button to View More & Apply */}
            <button
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={() => window.open(job.applyLink, "_blank")}
            >
              View More & Apply
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-md transition ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

JobList.propTypes = {
    jobListings: PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
        })
    ).isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default JobList;
