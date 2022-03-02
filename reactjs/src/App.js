import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from '../src/Components/Form'
import Result from '../src/Components/Result'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Form />} />
      <Route exact path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
