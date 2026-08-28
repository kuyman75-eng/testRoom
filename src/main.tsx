import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import HelloPage from './pages/HelloPage.tsx';
import './index.css';

const page =
  window.location.pathname === '/hello' ? <HelloPage /> : <App />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>{page}</StrictMode>
);
