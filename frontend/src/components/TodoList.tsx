import React from "react";
import { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  filter: "all" | "active" | "completed";
  searchQuery: string;
  onToggleComplete: (todo: Todo) => void;
  onUpdateTitle: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  filter,
  searchQuery,
  onToggleComplete,
  onUpdateTitle,
  onDelete,
}) => {
  if (loading) {
    return (
      <section className="todo-list-wrapper">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-item glass-panel shimmer"></div>
        ))}
      </section>
    );
  }

  if (todos.length === 0) {
    return (
      <section className="todo-list-wrapper">
        <div className="empty-state glass-panel">
          <div className="empty-state-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h3>No hay tareas</h3>
          <p>
            {searchQuery
              ? "No se encontraron tareas que coincidan con tu búsqueda."
              : filter === "completed"
              ? "No has completado ninguna tarea todavía."
              : filter === "active"
              ? "¡Felicidades! No tienes ninguna tarea pendiente."
              : "Empieza añadiendo tu primera tarea en la parte superior."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="todo-list-wrapper">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onUpdateTitle={onUpdateTitle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
