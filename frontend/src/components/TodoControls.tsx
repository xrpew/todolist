import React from "react";

interface TodoControlsProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TodoControls: React.FC<TodoControlsProps> = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <section className="controls-row">
      <div className="filter-tabs">
        <button
          onClick={() => setFilter("all")}
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        >
          Completadas
        </button>
      </div>

      <div className="search-container">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar tareas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </section>
  );
};
