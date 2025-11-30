import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => (
  <Box mb={3}>
    <Typography>{entry.date} <i>{entry.description}</i></Typography>
    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
      <ul>
        {entry.diagnosisCodes.map(code => {
          const diagnosis = diagnoses.find(d => d.code === code);
          return (
            <li key={code}>
              {code} {diagnosis ? `- ${diagnosis.name}` : ""}
            </li>
          );
        })}
      </ul>
    )}
  </Box>
);

export default EntryDetails;