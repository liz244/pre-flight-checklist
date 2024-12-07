import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [checklists, setChecklists] = useState([]);

  // Retrieves all checklists on page load
  useEffect(() => {
    async function fetchChecklists() {
      try {
        const response = await api.get("checklists");
        setChecklists(response.data.response || []);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      }
    }
    fetchChecklists();
  }, []);

  // Delete a checklist after confirmation
  async function deleteChecklist(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this checklist?"
    );
    if (confirm) {
      try {
        await api.get(`checklist/delete?id=${id}`);
        setChecklists(checklists.filter((checklist) => checklist.id !== id));
      } catch (error) {
        console.error("Error deleting checklist:", error);
      }
    }
  }

  return (
    <div className="dashboard">
      {/* Main Title */}
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Button to create a new checklist */}
      <Link to="/form" className="button new-button">
        + New Checklist
      </Link>

      {/* Viewing checklists */}
      {checklists.length === 0 ? (
        <p className="no-checklists">No checklists created yet.</p>
      ) : (
        <ul className="checklist-list">
          {checklists.map((checklist) => (
            <li key={checklist.id} className="checklist-item">
              {/* Status section */}
              <div className="status">
                {checklist.todo.filter((task) => task.status === 1).length ===
                checklist.todo.length && checklist.todo.length > 0
                  ? "COMPLETED"
                  : checklist.todo.length > 0
                  ? "IN PROGRESS"
                  : "EMPTY"}
              </div>

              {/* Title and description */}
              <div className="checklist-content">
                <Link
                  to={`/checklist/${checklist.id}`}
                  className="checklist-link"
                >
                  <h2 className="checklist-title">{checklist.title}</h2>
                  <p className="checklist-description">{checklist.description}</p>
                </Link>
              </div>

              {/* Task progress */}
              <p className="task-progress">
                {checklist.todo.filter((task) => task.status === 1).length} /{" "}
                {checklist.todo.length} tasks completed
              </p>

              {/* Action buttons*/}
              <div className="actions">
                <Link
                  to={`/form/${checklist.id}`}
                  className="button edit-button"
                >
                  EDIT
                </Link>
                <button
                  onClick={() => deleteChecklist(checklist.id)}
                  className="button delete-button"
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
