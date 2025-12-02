import React, { useState } from "react";

import {  
  TextField, 
  Grid, 
  Button, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  InputLabel, 
  Select, 
  MenuItem, 
  Autocomplete
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Diagnosis, EntryFormValues } from "../../types";

import { HEALTHBAR_TEXTS } from "../HealthRatingBar";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const entryTypes = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [date, setDate] = useState('');
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<Diagnosis[]>([]);
  
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const healthColors: { [key: number]: string } = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let values: EntryFormValues;
    const commonValues = {
      date,
      type,
      description,
      specialist,
      diagnosisCodes: selectedDiagnosisCodes.map(d => d.code)
    }
    switch (type) {
      case "HealthCheck":
        values = {
          ...commonValues,
          type: "HealthCheck",
          healthCheckRating
        };
        break;
      case "Hospital":
        values = {
          ...commonValues,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      case "OccupationalHealthcare":
        values = {
          ...commonValues,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          } : undefined
        };
        break;
      default:
        throw new Error("Invalid entry type");
    }
    onSubmit({...values});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          value={type}
          onChange={e => setType(e.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
          fullWidth
        >
          {entryTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          type="date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {type === "HealthCheck" && (
          <>
            <InputLabel id="health-check-rating-label">Health Check Rating</InputLabel>
            <Select
              labelId="health-check-rating-label"
              value={healthCheckRating}
              onChange={e => setHealthCheckRating(Number(e.target.value))}
              fullWidth
            >
              {[0, 1, 2, 3].map(rating => (
                <MenuItem key={rating} value={rating}>
                  <span><FavoriteIcon style={{ color: healthColors[rating], verticalAlign: 'middle', marginRight: 8 }} />
                  {HEALTHBAR_TEXTS[rating]}</span>
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {type === "Hospital" && (
          <>
            <InputLabel id="discharge-label">Discharge Details</InputLabel>

            <TextField
              type="date"
              fullWidth 
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth 
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth 
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel id="sick-leave-label">Sick Leave Start date</InputLabel>
            <TextField
              type="date"
              fullWidth 
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <InputLabel id="sick-leave-end-label">Sick Leave End date</InputLabel>
            <TextField
              type="date"
              fullWidth 
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}

        <Autocomplete
          multiple
          options={diagnoses}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          value={selectedDiagnosisCodes}
          onChange={(_, newValue) => setSelectedDiagnosisCodes(newValue)}
          renderTags={(value) =>
            value.map((option, index) => (
              <span key={option.code} style={{ display: "inline-flex", alignItems: "center", marginRight: 8, background: "#e0e0e0", borderRadius: 16, padding: "2px 8px" }}>
                {option.code} - {option.name}
                <CloseIcon
                  fontSize="small"
                  style={{ marginLeft: 4, cursor: "pointer" }}
                  onClick={() => {
                    setSelectedDiagnosisCodes(value.filter((_, i) => i !== index));
                  }}
                />
              </span>
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Diagnosis Codes" placeholder="Select diagnosis codes" />
          )}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;