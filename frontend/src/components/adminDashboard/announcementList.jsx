import React, { useState } from "react";
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
} from "@coreui/react";

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Website Maintenance",
      content: "Our website will be down for maintenance on 2025-03-10 from 2AM to 4AM.",
      date: "2025-02-20",
    },
    {
      id: 2,
      title: "New Feature Released",
      content: "We are excited to announce the release of our new dashboard feature for clients.",
      date: "2025-02-18",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // Handle Delete
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  // Handle Save (for Add/Edit)
  const handleSubmit = (e, modalType) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);

    const newAnnouncement = {
      id: currentItem?.id || new Date().getTime(), // Generate a new ID for add
      title: formData.get("title"),
      content: formData.get("content"),
      date: formData.get("date"),
    };

    if (modalType === "edit") {
      // Update announcement
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === currentItem.id ? newAnnouncement : announcement
        )
      );
    } else {
      // Add new announcement
      setAnnouncements([...announcements, newAnnouncement]);
    }

    setModalVisible(false); // Close modal after saving
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
      <CCard className="main-card">
        <CCardHeader className="card-header">
          <h4>Manage Announcements</h4>
          <CButton
            className="add-button"
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
              <CCol sm="4" key={announcement.id}>
                <div className="card p-3 shadow-sm">
                  <h5>{announcement.title}</h5>
                  <p>{announcement.content}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Date: {new Date(announcement.date).toLocaleDateString("en-GB")}
                  </p>
                  <div className="d-flex justify-content-end">
                    <CButton
                      className="edit"
                      onClick={() => {
                        setModalType("edit");
                        setCurrentItem(announcement);
                        setModalVisible(true);
                      }}
                    >
                      Edit
                    </CButton>
                    <CButton
                      className="delete"
                      onClick={() => handleDelete(announcement.id)}
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
              defaultValue={currentItem?.date}
            />

            <CModalFooter>
              <CButton
                className="close-button"
                onClick={() => setModalVisible(false)}
              >
                Close
              </CButton>
              <CButton className="submit-button" type="submit">
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
