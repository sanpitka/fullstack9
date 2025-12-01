import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry, Entry, NewEntry } from '../types';
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

const addEntry = ( patientId: string, entry: NewEntry ): Entry | null => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return null;
  }
  const newEntry: Entry = { id: uuid(), ...entry } as Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonsensitiveEntries,
  addPatient,
  addEntry
};