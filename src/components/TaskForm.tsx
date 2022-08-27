import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function TasksForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      addTask({
        ...task,
        id: uuid(),
      })
    );
    navigate("/");
  };

  const handleBack = (e: { preventDefault: () => void }) => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 w-full">
      <label htmlFor="title" className="block text-sm font-bold mb-1">
        Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleChanges}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></input>
      <label htmlFor="description" className="block text-sm font-bold mb-1">
        Description
      </label>
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChanges}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>
      <div className="flex justify-between">
        <button className="bg-indigo-600 px-2 py-1 rounded-md" onClick={handleBack}>
          Back
        </button>
        <button className="bg-green-600 px-2 py-1 rounded-md">Save</button>
      </div>
    </form>
  );
}

export default TasksForm;
