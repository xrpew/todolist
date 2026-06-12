import React from "react";

interface TodoHeaderProps {
  connected: boolean;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ connected }) => {
  return (
    <header className="todo-header">
      <div className="brand">
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h1>TaskFlow</h1>
      </div>
      <div className={`status-badge ${connected ? "connected" : "disconnected"}`}>
        <div className="status-dot"></div>
        {connected ? "Servidor Conectado" : "Servidor Desconectado"}
      </div>
    </header>
  );
};
