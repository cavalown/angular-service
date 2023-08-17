export interface Todos {
    todos: Todo[]
  };

interface Todo {
    id: string,
    title: string,
    isCompleted: boolean
}
  