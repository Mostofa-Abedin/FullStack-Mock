import React, { useEffect, useState } from "react";
import { api } from "../../utils/api"; // Import Axios instance
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
} from "@coreui/react";

const ClientsList = () => {
  const [clients, setClients] = useState([]); // State to store clients
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients"); // Fetch clients from backend
        setClients(response.data); // Store clients in state
      } catch (err) {
        setError("Error fetching clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <CContainer fluid>
      <Link to="/admin/dashboard">
        <CButton className="dashboard-button">Back to Dashboard</CButton>
      </Link>
      <CCard>
        <CCardHeader>
          <h4>All Clients</h4>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {clients.map((client) => (
              <CCol md="4" key={client._id}>
                <CCard className="client-card">
                  <CCardBody>
                    <h5>{client.name}</h5>
                    <p>{client.businessName}</p>
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default ClientsList;
