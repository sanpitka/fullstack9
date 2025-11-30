import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewEntrySchema } from '../utils';

import { z } from 'zod';
import { 
  Patient, 
  NewPatientEntry, 
  NonSensitivePatient 
} from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonsensitiveEntries());
});

router.get('/:id', (req: Request, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getEntries().find(p => p.id === req.params.id);
  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
  }
  res.send(patient);
});

const newPatientParser = (
  req: Request, 
  _res: Response, 
  next: NextFunction
) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown, 
  _req: Request, 
  res: Response, 
  next: NextFunction
) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatientEntry>, 
  res: Response<Patient>
) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;