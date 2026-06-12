import React from "react";

interface TodoStatsProps {
  totalCount: number;
  completedCount: number;
  completionPercentage: number;
}

export const TodoStats: React.FC<TodoStatsProps> = ({
  totalCount,
  completedCount,
  completionPercentage,
}) => {
  return (
    <section className="stats-grid">
      <div className="stat-card glass-panel">
        <span className="stat-label">Tareas Totales</span>
        <span className="stat-val">{totalCount}</span>
      </div>
      <div className="stat-card glass-panel">
        <span className="stat-label">Completadas</span>
        <span className="stat-val">{completedCount}</span>
      </div>
      <div className="stat-card glass-panel progress-container">
        <span className="stat-label">Progreso</span>
        <span className="stat-val" style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {completionPercentage}%
        </span>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>
    </section>
  );
};
