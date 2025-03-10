import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./admindashboard.css";
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormSelect,
} from "@coreui/react";

const AnnouncementsList = ({announcements, setAnnouncements, businesses}) => {

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete announcement");

      setAnnouncements((prev) => prev.filter((announcement) => announcement._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  // Handle Save (for Add/Edit)
  const handleSubmit = async (e, modalType) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const newAnnouncement = {
      id: currentItem?.id || new Date().getTime(), // Generate a new ID for add
      title: formData.get("title"),
      business: formData.get("business"),
      content: formData.get("content"),
      date: formData.get("date"),
    };

    try {
      let response;
      if (modalType === "edit" && currentItem) {
        response = await fetch(`${baseUrl}/announcements/${currentItem._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAnnouncement),
        });
      } else {
        response = await fetch(`${baseUrl}/announcements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
          body: JSON.stringify(newAnnouncement),
        });
      }
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to save announcement: ${errorMessage}`);
      }

      const data = await response.json();
      const updatedAnnouncement = data.announcement;
      setAnnouncements((prev) => {
        if (modalType === "edit") {
          return prev.map((announcement) =>
            announcement._id === updatedAnnouncement._id ? updatedAnnouncement : announcement
          );
        } else {
          return [...prev, updatedAnnouncement];
        }
      });

      setModalVisible(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("❌ Error saving announcement:", error);
    }
  };

  return (
    <CContainer fluid>
      {/* Back to Dashboard Link */}
      <Link to="/admin/dashboard">
        <CButton className="dashboard-button">
          Back to Dashboard
        </CButton>
      </Link>

      {/* Add/Edit Announcement Section */}
      <CCard className="dash-main-card">
        <CCardHeader className="dash-card-header">
          <h4>All Announcements</h4>
          <CButton
            className="dash-add-button"
            onClick={() => {
              setModalType("add");
              setCurrentItem(null);
              setModalVisible(true);
            }}
          >
            Add Announcement
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {announcements.map((announcement) => (
              <CCol sm="4" key={announcement._id}>
                <div className="dash-card">
                  <h5>{announcement.title}</h5>
                  <p>{businesses.find((business)=> business._id == announcement.businessId)?.businessName}</p>
                  {/* <p>{businesses.filter((business)=> business._id == announcement.businessId)}</p> */}
                  <p>{announcement.content}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Date: {new Date(announcement.updatedAt).toLocaleDateString("en-GB")}
                  </p>
                  <div className="d-flex justify-content-end">
                    <CButton
                      className="dash-edit"
                      onClick={() => {
                        setModalType("edit");
                        setCurrentItem(announcement);
                        setModalVisible(true);
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton
                      className="dash-delete"
                      onClick={() => handleDelete(announcement._id)}
                    >
                      Delete
                    </CButton>
                  </div>
                </div>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>

      {/* Modal for Add/Edit */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {modalType === "edit" ? `Edit Announcement` : `Add Announcement`}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={(e) => handleSubmit(e, modalType)}>
            <CFormInput
              type="text"
              label="Announcement Title"
              name="title"
              defaultValue={currentItem?.title}
            />
            <CFormSelect label="Business" name="business" defaultValue={currentItem?.clientId?._id || ""}>
              <option value="" disabled>Select a business</option>
              {businesses.map((business) => (
                <option key={business._id} value={business._id}>{business.businessName}</option>
              ))}
            </CFormSelect>
            {/* Use regular textarea here instead of CFormTextArea */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                defaultValue={currentItem?.content}
              ></textarea>
            </div>
            
            <CFormInput
              type="date"
              label="Date"
              name="date"
              defaultValue={currentItem?.updatedAt}
            />

            <CModalFooter>
              <CButton
                className="close-button"
                onClick={() => setModalVisible(false)}
              >
                Close
              </CButton>
              <CButton className="dash-submit-button" type="submit">
                Save Changes
              </CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </CContainer>
  );
};

export default AnnouncementsList;
