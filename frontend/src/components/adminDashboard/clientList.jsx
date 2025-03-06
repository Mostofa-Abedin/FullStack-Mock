import React, { useState } from "react";
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
  CAlert,
} from "@coreui/react";
import { Link } from "react-router-dom";

const ClientsList = ({ clients, setClients, businesses, setBusinesses }) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("authToken");

  // Filter users to only include those with role "client"
  const clientList = clients.filter((user) => user.role === "client");

  // Modal states for Add/Edit functionality
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [currentItem, setCurrentItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle Delete client and its associated business record (if any)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setClients((prev) => prev.filter((client) => client._id !== id));
      // Also remove associated business if exists (safe check added)
      setBusinesses((prev) =>
        prev.filter((bus) => bus.userId && bus.userId.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Determine current business details for editing (if any)
  let currentBusiness = null;
  if (modalType === "edit" && currentItem && businesses) {
    currentBusiness = businesses.find(
      (bus) => bus.userId && bus.userId.toString() === currentItem._id
    );
  }

  // Handle form submit for both Add and Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: "client",
      ...(modalType === "add" && { password: formData.get("password") }),
    };
    // Gather business details from the form
    const businessData = {
      businessName: formData.get("businessName"),
      phone: formData.get("phone"),
    };

    // Basic validation
    if (
      !userData.name ||
      !userData.email ||
      !businessData.businessName ||
      !businessData.phone ||
      (modalType === "add" && !userData.password)
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      let response;
      if (modalType === "edit" && currentItem) {
        // Update user details
        response = await fetch(
          `${baseUrl}/users/${currentItem._id}/profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          }
        );
      } else {
        // Create new user
        response = await fetch(`${baseUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to save user: " + errorText);
      }

      const updatedUser = await response.json();
      let updatedBusiness = null;

      // If editing and a business record exists, update its details
      if (modalType === "edit" && currentBusiness) {
        const businessResponse = await fetch(
          `${baseUrl}/business/update/${currentBusiness._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(businessData),
          }
        );
        if (!businessResponse.ok) {
          const errText = await businessResponse.text();
          throw new Error("Failed to update business: " + errText);
        }
        updatedBusiness = await businessResponse.json();
        // Update local businesses state
        setBusinesses((prev) =>
          prev.map((bus) =>
            bus._id === currentBusiness._id
              ? updatedBusiness.business || updatedBusiness
              : bus
          )
        );
      }

      // Update clients state with the updated/created user
      setClients((prev) => {
        if (modalType === "edit") {
          return prev.map((client) =>
            client._id === updatedUser._id ? updatedUser : client
          );
        } else {
          return [...prev, updatedUser];
        }
      });

      setModalVisible(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error saving user:", error);
      setErrorMessage("Error saving user: " + error.message);
    }
  };

  return (
    <CContainer fluid>
      <Link to="/admin/dashboard">
        <CButton className="dashboard-button">Back to Dashboard</CButton>
      </Link>

      {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

      <CCard>
        <CCardHeader>
          <h4>All Clients</h4>
          <CButton
            onClick={() => {
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
            {clientList.length > 0 ? (
              clientList.map((client) => {
                const bus = businesses.find(
                  (b) => b.userId && b.userId.toString() === client._id
                );
                return (
                  <CCol md="4" key={client._id}>
                    <CCard className="client-card">
                      <CCardBody>
                        <h5>{client.name}</h5>
                        {/* Display business details if available */}
                        <p>
                          Business Name: {bus ? bus.businessName : "N/A"}
                        </p>
                        <p>Phone: {bus ? bus.phone : "N/A"}</p>
                        <p>Email: {client.email}</p>
                        <CButton
                          onClick={() => {
                            setModalType("edit");
                            setCurrentItem(client);
                            setModalVisible(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton onClick={() => handleDelete(client._id)}>
                          Delete
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </CCol>
                );
              })
            ) : (
              <p>No clients found.</p>
            )}
          </CRow>
        </CCardBody>
      </CCard>

      {/* Modal for Add/Edit Client */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {modalType === "edit" ? "Edit Client" : "Add Client"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit} key={currentItem ? currentItem._id : "new"}>
            <CFormInput
              type="text"
              label="Name"
              name="name"
              defaultValue={currentItem?.name || ""}
            />
            <CFormInput
              type="email"
              label="Email"
              name="email"
              defaultValue={currentItem?.email || ""}
            />
            <CFormInput
              type="text"
              label="Business Name"
              name="businessName"
              defaultValue={currentBusiness?.businessName || ""}
            />
            <CFormInput
              type="text"
              label="Phone"
              name="phone"
              defaultValue={currentBusiness?.phone || ""}
            />
            {modalType === "add" && (
              <CFormInput
                type="password"
                label="Password"
                name="password"
              />
            )}
            <CModalFooter>
              <CButton onClick={() => setModalVisible(false)}>
                Close
              </CButton>
              <CButton type="submit">Save Changes</CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </CContainer>
  );
};

export default ClientsList;
