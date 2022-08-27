import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const customId = "custom-id-yes";

function TasksForm() {
  const toastId = React.useRef(null);

  const notify = () => {
    toast("Task Not Found!!!", {
      toastId: customId,
    });
  };

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state: any) => state.tasks);

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (params.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  const handleBack = (e: { preventDefault: () => void }) => {
    navigate("/");
  };

  useEffect(() => {
    if (params.id && Object(tasks).find((task: any) => task.id === params.id)) {
      setTask(Object(tasks).find((task: any) => task.id === params.id));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {(() => {
        if (
          !Object(tasks).find((task: any) => task.id === params.id) &&
          params.id
        ) {
          notify();
        }
      })()}
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 w-full">
        {Object(tasks).find((task: any) => task.id === params.id) &&
        params.id ? (
          <h1 className="block font-bold mb-1 flex justify-center h-full">
            Edit Task
          </h1>
        ) : (
          <h1 className="block font-bold mb-1 flex justify-center h-full">
            New Task
          </h1>
        )}
        <label htmlFor="title" className="block text-sm font-bold mb-1">
          Title:
        </label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={task.title}
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
          value={task.description}
        ></textarea>
        <div className="flex justify-between">
          <button
            className="bg-indigo-600 px-2 py-1 rounded-md"
            onClick={handleBack}
          >
            Back
          </button>
          <button className="bg-green-600 px-2 py-1 rounded-md">Save</button>
        </div>
      </form>
    </>
  );
}

export default TasksForm;
