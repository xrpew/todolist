import React from "react";

interface ErrorPanelProps {
  apiUrl?: string;
  onRetry: () => void;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({ apiUrl = "", onRetry }) => {
  return (
    <section className="error-panel glass-panel">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <div className="error-title">No se puede establecer conexión</div>
      <div className="error-desc">
        No se pudo establecer comunicación con el backend{apiUrl ? ` en ` : ""}{apiUrl && <code>{apiUrl}</code>}. 
        Asegúrate de que tus contenedores de Docker estén corriendo y el backend esté operativo.
      </div>
      <button onClick={onRetry} className="retry-btn">
        Reintentar Conexión
      </button>
    </section>
  );
};
