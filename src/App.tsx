import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Company from './Company';
import { PageWrapper } from './components/PageWrapper';

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
