import React, { useEffect, useState } from "react";
import { api } from "../../utils/api"; // Import Axios instance
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";

import { Link } from "react-router-dom";

const ClientsList = () => {
  const [clients, setClients] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients"); // Fetch clients from backend
        
        // ✅ Ensure clients is an array before setting state
        if (Array.isArray(response.data.clients)) {
          setClients(response.data.clients);
        } else {
          setClients([]); // Fallback to empty array
          console.error("Unexpected API response format:", response.data);
        }

      } catch (err) {
        setError("Error fetching clients");
        console.error("Error fetching clients:", err);
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
            {clients.length > 0 ? (
              clients.map((client) => (
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
              ))
            ) : (
              <p>No clients found.</p>
            )}
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default ClientsList;
