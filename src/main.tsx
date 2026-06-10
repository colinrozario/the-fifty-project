import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against sandbox environments where window.fetch has only a getter and causes crashes if overridden by third-party/platform scripts.
try {
  if (typeof window !== 'undefined' && window.fetch) {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: true,
      configurable: true,
    });
  }
} catch (e) {
  console.warn('Unable to redefine window.fetch:', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
