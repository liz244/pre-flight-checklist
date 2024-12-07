import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ChecklistDetails() {
  const { id } = useParams(); // Récupère l'ID de la checklist depuis l'URL
  const [checklist, setChecklist] = useState(null);

  // Fonction pour récupérer la checklist par son ID
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

  // Fonction pour inverser le statut d'une tâche
  async function toggleTaskStatus(taskIndex) {
    if (!checklist) return;

    const updatedTasks = checklist.todo.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, status: task.status === 0 ? 1 : 0 };
      }
      return task;
    });

    // Met à jour l'état global de la checklist
    const updatedStatus =
      updatedTasks.every((task) => task.status === 1) ? 2 : 1;

    // Sauvegarde les modifications via l'API
    try {
      await api.post("checklist/update", {
        id,
        title: checklist.title,
        description: checklist.description,
        todo: updatedTasks,
        status: updatedStatus,
      });

      // Met à jour l'état local
      setChecklist({ ...checklist, todo: updatedTasks, status: updatedStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  if (!checklist) return <p>Loading...</p>;

  return (
    <div className="checklist-details">
      {/* Nouveau titre indiquant l'écran */}
      <h1>Checklist</h1>
      <h2>{checklist.title}</h2>
      <p>{checklist.description}</p>
      <p>
        Status:{" "}
        {checklist.status === 0
          ? "Empty"
          : checklist.status === 1
          ? "In Progress"
          : "Completed"}
      </p>

      <ul className="tasks-list">
        {checklist.todo.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.status === 1 ? "completed" : ""}`}
            onClick={() => toggleTaskStatus(index)}
            style={{ cursor: "pointer" }}
          >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>Status: {task.status === 0 ? "Not Done" : "Done"}</p>
          </li>
        ))}
      </ul>

      <Link to="/" className="button back-button">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default ChecklistDetails;
