import AddTodo from './add-todo';

export default async function TodosPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
    cache: 'no-store',
  });
  const todos = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
      <AddTodo />
      <div className="space-y-4 mt-4">
        {todos.map((todo: any) => (
          <div key={todo.id} className="border rounded-lg p-4 shadow-md flex justify-between items-center bg-white">
            <div>
              <p className="text-lg font-semibold">{todo.title}</p>
              <p className="text-sm text-gray-500">{new Date(todo.date).toLocaleString()}</p>
            </div>
            <div className={`text-lg font-bold ${todo.done ? 'text-green-500' : 'text-red-500'}`}>
              {todo.done ? '✔️' : '❌'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
