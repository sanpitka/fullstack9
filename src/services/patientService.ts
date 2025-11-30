import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonsensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonsensitiveEntries,
  addPatient,
};