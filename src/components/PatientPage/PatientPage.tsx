import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      };
      void fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>

      <Typography variant="h5" style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries available.</Typography>
      ) : (
        <div>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default PatientPage;