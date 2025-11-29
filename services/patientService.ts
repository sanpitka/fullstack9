import patients from '../data/patients';

import { nonSensitivePatientEntry, PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonsensitiveEntries = (): nonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  getNonsensitiveEntries,
  addDiagnosis,
};