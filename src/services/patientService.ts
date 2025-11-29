import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonsensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonsensitiveEntries,
  addPatient,
};