import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Company from './Company';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
