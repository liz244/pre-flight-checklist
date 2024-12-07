import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ChecklistDetails() {
  const { id } = useParams(); // Get checklist ID from URL
  const [checklist, setChecklist] = useState(null);

  //Function to retrieve the checklist by its ID
  useEffect(() => {
    async function fetchChecklist() {
      try {
        const response = await api.get(`checklist?id=${id}`);
        setChecklist(response.data || {});
      } catch (error) {
        console.error("Error fetching checklist details:", error);
      }
    }
    fetchChecklist();
  }, [id]);

  // Function to reverse the status of a task
  async function toggleTaskStatus(taskIndex) {
    if (!checklist) return;

    const updatedTasks = checklist.todo.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, status: task.status === 0 ? 1 : 0 };
      }
      return task;
    });

    // Updates the overall status of the checklist
    const updatedStatus =
      updatedTasks.every((task) => task.status === 1) ? 2 : 1;

    // Save changes via API
    try {
      await api.post("checklist/update", {
        id,
        title: checklist.title,
        description: checklist.description,
        todo: updatedTasks,
        status: updatedStatus,
      });

      // Updates local state
      setChecklist({ ...checklist, todo: updatedTasks, status: updatedStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  if (!checklist) return <p>Loading...</p>;

  return (
    <div className="checklist-details">
      {/* Main screen title */}
      <h1 className="screen-title">CHECKLIST</h1>

      {/* Title and state container */}
      <div className="checklist-header">
        <h2 className="checklist-title">{checklist.title}</h2>
        <span className="checklist-state">
          {checklist.status === 0
            ? "Empty"
            : checklist.status === 1
            ? "In Progress"
            : "Completed"}
        </span>
      </div>

      {/* Checklist description */}
      <p className="checklist-description">{checklist.description}</p>

      {/*Task list*/}
      <ul className="task-list">
        {checklist.todo.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.status === 1 ? "completed" : ""}`}
            onClick={() => toggleTaskStatus(index)}
            style={{ cursor: "pointer" }}
          >
            <div className="task-info">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <p className="task-status">
                <span className="state-label">
                  {task.status === 0 ? "Not Done" : "Done"}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Button to return to the dashboard*/}
      <Link to="/" className="button back-button">
        BACK TO DASHBOARD
      </Link>
    </div>
  );
}

export default ChecklistDetails;
