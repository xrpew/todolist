"use client";

import { useEffect, useState } from "react";
import "./todo.css";

import { Todo } from "../types/todo";
import { TodoHeader } from "../components/TodoHeader";
import { TodoStats } from "../components/TodoStats";
import { TodoForm } from "../components/TodoForm";
import { ErrorPanel } from "../components/ErrorPanel";
import { TodoControls } from "../components/TodoControls";
import { TodoList } from "../components/TodoList";
import { TodoFooter } from "../components/TodoFooter";
import { todoService } from "../services/api";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch todos desde el backend utilizando el servicio centralizado
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getTodos();
      setTodos(data || []);
      setConnected(true);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Añadir una nueva tarea
  const handleAddTodo = async (title: string) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const createdTodo = await todoService.createTodo(title);
      setTodos((prev) => [createdTodo, ...prev]);
      setConnected(true);
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor. Revisa si el backend está activo.");
      setConnected(false);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // Alternar el estado de completado (con actualización optimista)
  const handleToggleComplete = async (todo: Todo) => {
    const updatedStatus = !todo.completed;

    // Actualización optimista de la UI
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      const data = await todoService.updateTodo(todo.id, { completed: updatedStatus });
      // Confirmar con el valor real del servidor
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? data : t)));
      setConnected(true);
    } catch (err) {
      console.error(err);
      // Revertir en fallo
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: !updatedStatus } : t))
      );
      setConnected(false);
    }
  };

  // Modificar el título de un Todo
  const handleUpdateTitle = async (id: number, title: string) => {
    // Actualización optimista de la UI
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );

    try {
      const data = await todoService.updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
      setConnected(true);
    } catch (err) {
      console.error(err);
      fetchTodos(); // Re-consultar desde servidor en fallo
      setConnected(false);
      throw err;
    }
  };

  // Eliminar un Todo (con actualización optimista)
  const handleDeleteTodo = async (id: number) => {
    const backupTodos = [...todos];

    // Actualización optimista de la UI
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await todoService.deleteTodo(id);
      setConnected(true);
    } catch (err) {
      console.error(err);
      // Revertir UI
      setTodos(backupTodos);
      setConnected(false);
    }
  };

  // Cálculos estadísticos
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtrado y búsqueda
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "active") return !todo.completed && matchesSearch;
    if (filter === "completed") return todo.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <main className="todo-container animate-fade-in">
      <TodoHeader connected={connected} />

      <TodoStats
        totalCount={totalCount}
        completedCount={completedCount}
        completionPercentage={completionPercentage}
      />

      <TodoForm
        connected={connected}
        submitting={submitting}
        onAddTodo={handleAddTodo}
      />

      {!connected && (
        <ErrorPanel onRetry={fetchTodos} />
      )}

      {connected && (
        <>
          <TodoControls
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <TodoList
            todos={filteredTodos}
            loading={loading}
            filter={filter}
            searchQuery={searchQuery}
            onToggleComplete={handleToggleComplete}
            onUpdateTitle={handleUpdateTitle}
            onDelete={handleDeleteTodo}
          />
        </>
      )}

      <TodoFooter />
    </main>
  );
}
