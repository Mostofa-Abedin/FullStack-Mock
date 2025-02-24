import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  CContainer,
  CNavItem as CSidebarItem,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./admindashboard.css";

import ProjectsList from "../adminDashboard/projectsList";
import ClientsList from "../adminDashboard/clientList";
import AnnouncementsList from "../adminDashboard/announcementList";

const AdminDashboard = ({ username }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John Doe",
      businessName: "John's Bakery",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      businessName: "Jane's Designs",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Robert Brown",
      businessName: "Robert's Auto Shop",
      email: "robert.brown@example.com",
      phone: "456-789-0123",
    },
    {
      id: 4,
      name: "Robert Brown",
      businessName: "Robert's Auto Shop",
      email: "robert.brown@example.com",
      phone: "456-789-0123",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project Alpha",
      details: "Details about Project Alpha",
      client: "John Doe",
      dueDate: "2025-03-01",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Project Beta",
      details: "Details about Project Beta",
      client: "Jane Smith",
      dueDate: "2025-04-01",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Project Gamma",
      details: "Details about Project Gamma",
      client: "Robert Brown",
      dueDate: "2025-05-01",
      status: "Upcoming",
    },
  ]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Update on New Features", date: "2025-02-20" },
    { id: 2, title: "System Downtime Notice", date: "2025-02-19" },
    { id: 3, title: "Client Survey", date: "2025-02-18" },
  ]);

  const [activeClientId, setActiveClientId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [formSection, setFormSection] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const {
      name,
      details,
      client,
      dueDate,
      status,
      businessName,
      email,
      phone,
    } = e.target.elements;
    let newItem;

    if (formSection === "clients") {
      if (type === "add") {
        newItem = {
          id: Date.now(),
          name: name.value,
          businessName: businessName.value,
          email: email.value,
          phone: phone.value,
        };
        setClients([...clients, newItem]);
      } else if (type === "edit" && currentItem) {
        newItem = {
          id: currentItem.id,
          name: name.value,
          businessName: businessName.value,
          email: email.value,
          phone: phone.value,
        };
        setClients(
          clients.map((client) =>
            client.id === currentItem.id ? newItem : client
          )
        );
      }
    } else if (formSection === "projects") {
      if (type === "add") {
        newItem = {
          id: Date.now(),
          name: name.value,
          details: details.value,
          client: client.value,
          dueDate: dueDate.value,
          status: status.value,
        };
        setProjects([...projects, newItem]);
      } else if (type === "edit" && currentItem) {
        newItem = {
          id: currentItem.id,
          name: name.value,
          details: details.value,
          client: client.value,
          dueDate: dueDate.value,
          status: status.value,
        };
        setProjects(
          projects.map((project) =>
            project.id === currentItem.id ? newItem : project
          )
        );
      }
    } else if (formSection === "announcements") {
      if (type === "add") {
        newItem = { id: Date.now(), title: name.value, date: dueDate.value };
        setAnnouncements([...announcements, newItem]);
      } else if (type === "edit" && currentItem) {
        newItem = {
          id: currentItem.id,
          title: name.value,
          date: dueDate.value,
        };
        setAnnouncements(
          announcements.map((announcement) =>
            announcement.id === currentItem.id ? newItem : announcement
          )
        );
      }
    }
    setModalVisible(false);
  };

  const handleDelete = (id, section) => {
    if (section === "clients") {
      setClients(clients.filter((client) => client.id !== id));
    } else if (section === "projects") {
      setProjects(projects.filter((project) => project.id !== id));
    } else {
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "upcoming";
      case "In Progress":
        return "in-progress";
      case "Client Review":
        return "client-review";
      case "Action Feedback":
        return "action-feedback";
      case "Complete":
        return "complete";
      case "On Hold":
        return "on-hold";
      default:
        "Upcoming";
        return "upcoming";
    }
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol md="10" className="p-4">
          <Routes>
            <Route
              path="/admin/clients"
              element={<ClientsList clients={clients} />}
            />
            <Route
              path="/admin/projects"
              element={<ProjectsList projects={projects} />}
            />
            <Route
              path="/announcements"
              element={<AnnouncementsList announcements={announcements} />}
            />
          </Routes>

          <h2 className="dash-welcome-text">
            Welcome, {username ? username : "Admin"}!
          </h2>

          {/* Client Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Clients</h4>
              <CButton
                className="dash-add-button"
                onClick={() => {
                  setFormSection("clients");
                  setModalType("add");
                  setCurrentItem(null);
                  setModalVisible(true);
                }}
              >
                Add Client
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {clients.slice(0, 3).map((client) => (
                  <CCol sm="4" key={client.id}>
                    <div
                      className="dash-card"
                      onClick={() =>
                        setActiveClientId(
                          activeClientId === client.id ? null : client.id
                        )
                      }
                    >
                      <h5>{client.name}</h5>
                      <p>{client.businessName}</p>
                      {activeClientId === client.id && (
                        <>
                          <p style={{ fontWeight: "bold" }}>
                            Email: {client.email}
                          </p>
                          <p style={{ fontWeight: "bold" }}>
                            Phone: {client.phone}
                          </p>
                        </>
                      )}
                      <div className="d-flex justify-content-end">
                        <CButton
                          className="dash-edit"
                          onClick={() => {
                            setFormSection("clients");
                            setModalType("edit");
                            setCurrentItem(client);
                            setModalVisible(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          className="dash-delete"
                          onClick={() => handleDelete(client.id, "clients")}
                        >
                          Delete
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                ))}
              </CRow>
              <Link to="/admin/clients">
                <CButton className="dash-add-button">View All</CButton>
              </Link>
            </CCardBody>
          </CCard>

          {/* Add/Edit Project Section */}
          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Projects</h4>
              <CButton
                className="dash-add-button"
                onClick={() => {
                  setFormSection("projects");
                  setModalType("add");
                  setCurrentItem(null);
                  setModalVisible(true);
                }}
              >
                Add Project
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {projects.map((project) => (
                  <CCol sm="4" key={project.id}>
                    <div
                      className={`dash-card p-3 shadow-sm ${getStatusColor(
                        project.status
                      )}`}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          fontSize: "16px",
                          textAlign: "right",
                        }}
                      >
                        {project.status}
                      </p>
                      <h5>{project.name}</h5>
                      <p>{project.client}</p>
                      <p>Details: {project.details}</p>
                      <p style={{ fontWeight: "bold" }}>
                        Due Date:{" "}
                        {new Date(project.dueDate).toLocaleDateString("en-GB")}
                      </p>
                      <div className="d-flex justify-content-end">
                        <CButton
                          className="dash-edit"
                          onClick={() => {
                            setFormSection("projects");
                            setModalType("edit");
                            setCurrentItem(project);
                            setModalVisible(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          className="dash-delete"
                          onClick={() => handleDelete(project.id, "projects")}
                        >
                          Delete
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                ))}
              </CRow>
              <Link to="/admin/projects">
                <CButton className="dash-add-button">View All</CButton>
              </Link>
            </CCardBody>
          </CCard>

          <CCard className="dash-main-card">
            <CCardHeader className="dash-card-header">
              <h4>Manage Announcements</h4>
              <CButton
                className="dash-add-button"
                onClick={() => {
                  setFormSection("announcements");
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
                    <div className="dash-card p-3 shadow-sm">
                      <h5>{announcement.title}</h5>
                      <p>
                        {new Date(announcement.date).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                      <div className="d-flex justify-content-end">
                        <CButton
                          className="dash-edit"
                          onClick={() => {
                            setFormSection("announcements");
                            setModalType("edit");
                            setCurrentItem(announcement);
                            setModalVisible(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          className="dash-delete"
                          onClick={() =>
                            handleDelete(announcement.id, "announcements")
                          }
                        >
                          Delete
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                ))}
              </CRow>
              <Link to="/admin/announcements">
                <CButton className="dash-add-button">View All</CButton>
              </Link>
            </CCardBody>
          </CCard>

          {/* Modal for Add/Edit */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
              <CModalTitle>
                {modalType === "edit"
                  ? `Edit ${formSection.slice(0, -1)}`
                  : `Add ${formSection.slice(0, -1)}`}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <form onSubmit={(e) => handleSubmit(e, modalType)}>
                {formSection === "clients" ? (
                  <>
                    <CFormInput
                      type="text"
                      label="Name"
                      name="name"
                      defaultValue={currentItem?.name}
                    />
                    <CFormInput
                      type="text"
                      label="Business Name"
                      name="businessName"
                      defaultValue={currentItem?.businessName}
                    />
                    <CFormInput
                      type="email"
                      label="Email"
                      name="email"
                      defaultValue={currentItem?.email}
                    />
                    <CFormInput
                      type="text"
                      label="Phone"
                      name="phone"
                      defaultValue={currentItem?.phone}
                    />
                  </>
                ) : formSection === "projects" ? (
                  <>
                    <CFormInput
                      type="text"
                      label="Project Name"
                      name="name"
                      defaultValue={currentItem?.name}
                    />
                    <CFormInput
                      type="text"
                      label="Details"
                      name="details"
                      defaultValue={currentItem?.details}
                    />
                    <CFormSelect
                      label="Client"
                      name="client"
                      defaultValue={currentItem?.client}
                    >
                      {clients.map((client) => (
                        <option key={client.id} value={client.name}>
                          {client.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormInput
                      type="date"
                      label="Due Date"
                      name="dueDate"
                      defaultValue={currentItem?.dueDate}
                    />
                    <CFormSelect
                      label="Status"
                      name="status"
                      defaultValue={currentItem?.status}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Client Review">Client Review</option>
                      <option value="Action Feedback">Action Feedback</option>
                      <option value="Complete">Complete</option>
                      <option value="On Hold">On Hold</option>
                    </CFormSelect>
                  </>
                ) : formSection === "announcements" ? (
                  <>
                    <CFormInput
                      type="text"
                      label="Title"
                      name="name"
                      defaultValue={currentItem?.title}
                    />
                    <CFormInput
                      type="date"
                      label="Date"
                      name="dueDate"
                      defaultValue={currentItem?.date}
                    />
                  </>
                ) : null}
                <CModalFooter>
                  <CButton
                    className="dash-close-button"
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
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AdminDashboard;
