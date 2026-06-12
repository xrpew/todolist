import React, { useState } from "react";

interface TodoFormProps {
  connected: boolean;
  submitting: boolean;
  onAddTodo: (title: string) => Promise<void>;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  connected,
  submitting,
  onAddTodo,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting || !connected) return;

    try {
      await onAddTodo(title.trim());
      setTitle(""); // Limpiar input solo en éxito
    } catch (err) {
      // El error se maneja en el padre (alerta, etc.)
      console.error(err);
    }
  };

  return (
    <section className="todo-form-panel glass-panel">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="Añadir una nueva tarea a la lista..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!connected || submitting}
        />
        <button
          type="submit"
          className="todo-submit-btn"
          disabled={!title.trim() || !connected || submitting}
        >
          {submitting ? (
            <span>Guardando...</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Añadir</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};
