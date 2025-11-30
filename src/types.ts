import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface DgEntry {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}


export type NewPatientEntry = z.infer<typeof NewEntrySchema>; 

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

