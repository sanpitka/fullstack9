import { useEffect, useState } from "react";
import { Diary } from "./types";
import { NewEntry } from "./types";
import { BrowserRouter as Router } from "react-router-dom";
import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

function App() {  
  const [entries, setEntries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setEntries(data));
  }, [])

  const addEntry = async (entry: NewEntry) => {
    const newEntry = await diaryService.create(entry);
    setEntries(entries.concat(newEntry));
  };

  return (
    <Router>
      <h1>Flight diary</h1>
      <DiaryForm onSubmit={addEntry} />
      <DiaryList diaries={entries} />
    </Router>
  )
}

export default App
