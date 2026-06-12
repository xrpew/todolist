import { Todo } from "../types/todo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Servicio para comunicarse con la API del Backend.
 * Gestiona el envío de cabeceras comunes y maneja errores HTTP de forma genérica.
 */
export const todoService = {
  /**
   * Obtiene todos los todos
   */
  async getTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/api/todos`);
    if (!response.ok) {
      throw new Error(`Error al obtener tareas: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Crea una nueva tarea
   */
  async createTodo(title: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error(`Error al crear tarea: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Actualiza una tarea existente (completado o título)
   */
  async updateTodo(id: number, data: { title?: string; completed?: boolean }): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar tarea: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Elimina una tarea por su ID
   */
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar tarea: ${response.statusText}`);
    }
  },
};
