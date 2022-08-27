import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/taskSlice";
import { Link } from "react-router-dom";

function TasksList() {
  const tasks = useSelector((state:any) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: any) => {
    dispatch(deleteTask(id));
  };

  

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Total Tasks: {Object.keys(tasks).length}</h1>
        <Link to="/new" className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">New Task</Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
      {tasks.map((task: any) => (
        <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
          <header className="flex justify-between">
          <h3>{task.title}</h3>
          <div className="flex">
          <button onClick={() => handleDelete(task.id)} className="bg-red-500 px-2 py-1 rounded-md text-sm self-center">Delete</button>
          </div>
          </header>
          <p>{task.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default TasksList;
