import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { getEntryIcon, getHealthIcon } from "./EntryIcons";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  
  const diagnosisList = entry.diagnosisCodes?.map(code => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return (
    <li key={code}>
      {code} {diagnosis ? `- ${diagnosis.name}` : ""}
    </li>
    );
  });

  switch (entry.type) {
    case "Hospital":
      return (
        <Box mb={3} bgcolor="lightblue">
          <Typography>{entry.date} {getEntryIcon(entry.type)}</Typography>
          <Typography><i>{entry.description}</i></Typography>          
          {diagnosisList && <ul>{diagnosisList}</ul>}
          <Typography>Discharge on {entry.discharge.date}: <i>{entry.discharge.criteria}</i></Typography>
          <Typography>Diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box mb={3} bgcolor="lightblue">
          <Typography>{entry.date} {getEntryIcon(entry.type)} {entry.employerName}</Typography>
          <Typography><i>{entry.description}</i></Typography>
          {diagnosisList && <ul>{diagnosisList}</ul>}
          {entry.sickLeave && (
            <Typography>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
          )}
          <Typography>Diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    case "HealthCheck":
      return (
        <Box mb={3} bgcolor="lightblue">
          <Typography>{entry.date} {getEntryIcon(entry.type)}</Typography>
          <Typography><i>{entry.description}</i></Typography>
          {getHealthIcon(entry.healthCheckRating)}
          {diagnosisList && <ul>{diagnosisList}</ul>}
          <Typography>Diagnosed by {entry.specialist}</Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;