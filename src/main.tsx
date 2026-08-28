import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HelloPage from './pages/HelloPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloPage />
  </StrictMode>
);
