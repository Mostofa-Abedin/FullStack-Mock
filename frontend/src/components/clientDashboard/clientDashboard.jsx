import { useState } from "react";
import { CContainer, CRow, CCol, CButton, CCard, CCardBody, CCardHeader, CFormInput, CFormSelect, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./clientdashboard.css";

const ClientDashboard = ({ username }) => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", details: "Details about Project Alpha", dueDate: "2025-03-01", status: "Upcoming" },
    { id: 2, name: "Project Beta", details: "Details about Project Beta", dueDate: "2025-04-01", status: "Upcoming" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [formSection, setFormSection] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const { name, details, dueDate, status } = e.target.elements;
    let newItem;

    if (formSection === "projects") {
      if (type === "add") {
        newItem = {
          id: Date.now(),
          name: name.value,
          details: details.value,
          dueDate: dueDate.value,
          status: status.value,
        };
        setProjects([...projects, newItem]);
      } else if (type === "edit" && currentItem) {
        newItem = {
          id: currentItem.id,
          name: name.value,
          details: details.value,
          dueDate: dueDate.value,
          status: status.value,
        };
        setProjects(projects.map((project) => (project.id === currentItem.id ? newItem : project)));
      }
    }

    setModalVisible(false);
  };

  // Function to determine the color based on project status
  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "lightblue";
      case "In Progress":
        return "lightgreen";
      case "Client Review":
        return "lightyellow";
      case "Action Feedback":
        return "lightcoral";
      case "Complete":
        return "lightgray";
      case "On Hold":
        return "lightpink";
      default:
        return "white";
    }
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol md="10" className="p-4">
          <h2 className="dash-welcome-text">Welcome, {username ? username : "Client"}!</h2>

          {/* Projects Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Your Projects</h4>
              <CButton className="dash-add-button" onClick={() => { setFormSection("projects"); setModalType("add"); setCurrentItem(null); setModalVisible(true); }}>Add Project</CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {projects.map((project) => (
                  <CCol sm="4" key={project.id}>
                    <div 
                      className="dash-card p-3 shadow-sm" 
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      <h5>{project.name}</h5>
                      <p>Details: {project.details}</p>
                      <p style={{ fontWeight: "bold" }}>Due Date: {new Date(project.dueDate).toLocaleDateString("en-GB")}</p>
                      <p>Status: {project.status}</p>
                      <CButton color="primary" onClick={() => { setFormSection("projects"); setModalType("edit"); setCurrentItem(project); setModalVisible(true); }}>Edit</CButton>
                    </div>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>

          {/* Modal for Add/Edit */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
              <CModalTitle>{modalType === "edit" ? `Edit Project` : `Add Project`}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <form onSubmit={(e) => handleSubmit(e, modalType)}>
                {formSection === "projects" && (
                  <>
                    <CFormInput type="text" label="Project Name" name="name" defaultValue={currentItem?.name} />
                    <CFormInput type="text" label="Details" name="details" defaultValue={currentItem?.details} />
                    <CFormInput type="date" label="Due Date" name="dueDate" defaultValue={currentItem?.dueDate} />
                    <CFormSelect label="Status" name="status" defaultValue={currentItem?.status}>
                        
                      <option value="Upcoming" className="upcoming"> Upcoming</option>
                      <option value="In Progress" className="in-progress">In Progress</option>
                      <option value="Client Review" className="client-review">Client Review</option>
                      <option value="Action Feedback" className="action-feedback">Action Feedback</option>
                      <option value="Complete" className="complete">Complete</option>
                      <option value="On Hold" className="on-hold">On Hold</option>
                    </CFormSelect>
                  </>
                )}
                <CModalFooter>
                  <CButton onClick={() => setModalVisible(false)}>Close</CButton>
                  <CButton type="submit">Save Changes</CButton>
                </CModalFooter>
              </form>
            </CModalBody>
          </CModal>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ClientDashboard;
