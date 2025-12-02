import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { Diagnosis, EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, diagnoses, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} diagnoses={diagnoses} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
