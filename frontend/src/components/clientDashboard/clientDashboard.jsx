import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CButton,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../adminDashboard/admindashboard.css";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state for business details
  const [editMode, setEditMode] = useState(false);
  const [editBusinessName, setEditBusinessName] = useState("");
  const [editIndustry, setEditIndustry] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      setError("User not found.");
      setLoading(false);
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      // 1. Fetch the business details for the logged-in user
      const businessRes = await fetch(`${baseUrl}/business/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!businessRes.ok) {
        throw new Error("Failed to fetch business details");
      }
      const businessData = await businessRes.json();

      // 2. Fetch projects and announcements concurrently
      const [projectsRes, announcementsRes] = await Promise.all([
        fetch(`${baseUrl}/projects/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (!projectsRes.ok || !announcementsRes.ok) {
        throw new Error("Failed to fetch projects or announcements");
      }
      const projectsData = await projectsRes.json();
      const announcementsData = await announcementsRes.json();

      // 3. Update state
      setBusinessDetails(businessData);
      setProjects(projectsData.projects || []);
      setAnnouncements(announcementsData.announcements || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // ---------- Business Details Edit Handlers ----------

  const handleEditClick = () => {
    if (!businessDetails) return;
    // Initialize editable fields with current business details
    setEditBusinessName(businessDetails.businessName || "");
    setEditIndustry(businessDetails.industry || "");
    setEditWebsite(businessDetails.website || "");
    setEditPhone(businessDetails.phone || "");
    setEditAddress(businessDetails.address || "");
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = async () => {
    if (!businessDetails?._id) {
      setError("No business record to update.");
      return;
    }
    try {
      const patchRes = await fetch(
        `${baseUrl}/business/update/${businessDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            businessName: editBusinessName,
            industry: editIndustry,
            website: editWebsite,
            phone: editPhone,
            address: editAddress,
          }),
        }
      );

      if (!patchRes.ok) {
        throw new Error("Failed to update business details");
      }

      const patchData = await patchRes.json();
      setBusinessDetails(patchData.business);
      setEditMode(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* ---------- Business Details Section ---------- */}
          {businessDetails && (
            <CCard>
              <CCardBody>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  My Business Details
                </h2>
                {/* Read-only mode */}
                {!editMode && (
                  <>
                    <p>
                      <strong>Business Name:</strong>{" "}
                      {businessDetails.businessName}
                    </p>
                    <p>
                      <strong>Industry:</strong> {businessDetails.industry}
                    </p>
                    <p>
                      <strong>Website:</strong> {businessDetails.website}
                    </p>
                    <p>
                      <strong>Phone:</strong> {businessDetails.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {businessDetails.address}
                    </p>
                    <CButton
                      onClick={handleEditClick}
                      color="primary"
                      className="mt-3"
                    >
                      Edit Business
                    </CButton>
                  </>
                )}
                {/* Edit mode */}
                {editMode && (
                  <div className="mt-2">
                    <div className="mb-3">
                      <label>Business Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editBusinessName}
                        onChange={(e) => setEditBusinessName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Industry</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editIndustry}
                        onChange={(e) => setEditIndustry(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Website</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <CButton color="success" onClick={handleSaveEdit}>
                        Save
                      </CButton>
                      <CButton
                        color="secondary"
                        className="ml-2"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </CButton>
                    </div>
                  </div>
                )}
              </CCardBody>
            </CCard>
          )}

          {/* ---------- Projects Section (Read-Only) ---------- */}
          <CCard>
            <CCardBody>
              <h2 className="text-xl font-bold flex items-center gap-2">
                My Projects
              </h2>
              <ul>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <li key={project._id} className="py-2 border-b">
                      <p><strong>Project Name:</strong> {project.projectName}</p>
                      <p><strong>Status:</strong> {project.status}</p>
                      <p><strong>Description:</strong> {project.description}</p>
                      <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
                    </li>
                  ))
                ) : (
                  <p>No projects available</p>
                )}
              </ul>
            </CCardBody>
          </CCard>

          {/* ---------- Announcements Section (Read-Only) ---------- */}
          <CCard>
            <CCardBody>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Announcements
              </h2>
              <ul>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <li key={announcement._id} className="py-2 border-b">
                      <p>
                        <strong>Title:</strong> {announcement.title}
                      </p>
                      <p>
                        <strong>Content:</strong> {announcement.content}
                      </p>
                      <p>
                        <strong>Active:</strong> {announcement.active ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No announcements available</p>
                )}
              </ul>
            </CCardBody>
          </CCard>
        </>
      )}
    </div>
  );
};

export default ClientDashboard;
