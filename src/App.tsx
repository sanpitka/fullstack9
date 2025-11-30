import { useEffect, useState } from "react";
import { Diary } from "./types";
import { BrowserRouter as Router } from "react-router-dom";
import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";

function App() {  
  const [entries, setEntries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setEntries(data));
  }, [])

  return (
    <Router>
      <h1>Flight diary</h1>
      <DiaryList diaries={entries} />
    </Router>
  )
}

export default App
