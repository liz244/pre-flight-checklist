import React, { useState, useEffect } from "react"; // For useState and useEffect
import { useParams, useNavigate } from "react-router-dom"; // For useParams and useNavigate
import api from "../services/api"; // To call API functions


function ChecklistForm() {
  const { id } = useParams(); //Get ID from URL (if it exists)
  const navigate = useNavigate(); // To redirect to the dashboard

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load data if modifying an existing checklist
  useEffect(() => {
    if (id) {
      async function fetchChecklist() {
        try {
          const response = await api.get(`checklist?id=${id}`);
          const checklist = response.data;
          setTitle(checklist.title);
          setDescription(checklist.description);
          setTasks(checklist.todo || []);
        } catch (error) {
          console.error("Error fetching checklist:", error);
        }
      }
      fetchChecklist();
    }
  }, [id]);

  // Function to add new task
  function addTask() {
    setTasks([...tasks, { title: "", description: "", status: 0 }]);
  }

  // Function to update an existing task
  function updateTask(index, field, value) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  }

  // Fonction for delete a task
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Save a checklist (création or modification)
  async function saveChecklist() {
    try {
      if (id) {
        // Modify a checklist
        await api.post("checklist/update", {
          id,
          title,
          description,
          todo: tasks,
        });
      } else {
        // Create new checklist
        await api.post("checklist/add", {
          title,
          description,
          todo: tasks,
        });
      }
      navigate("/"); // Go back to dashboard
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  }

  return (
    <div className="form">
      {/* Main title Form and dynamic subtitle*/}
      <h1>Form</h1>
      <h2>{id ? "Edit Checklist" : "New Checklist"}</h2>

      {/* Fields for title and description*/}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      />

      <h3>Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="text"
              placeholder="Task Title"
              value={task.title}
              onChange={(e) => updateTask(index, "title", e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={task.description}
              onChange={(e) => updateTask(index, "description", e.target.value)}
              className="form-input"
            />
            <button
              onClick={() => deleteTask(index)}
              className="button delete-button"
            >
              Delete Task
            </button>
          </li>
        ))}
      </ul>
      <button onClick={addTask} className="button add-button">
        + Add Task
      </button>

      {/* Save and return buttons */}
      <button onClick={saveChecklist} className="button save-button">
        Save Checklist
      </button>
      <button onClick={() => navigate("/")} className="button back-button">
        Back to Dashboard
      </button>
    </div>
  );
}

export default ChecklistForm;
