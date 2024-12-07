import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [checklists, setChecklists] = useState([]);

  // Récupère toutes les checklists au chargement de la page
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

  // Supprime une checklist après confirmation
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
      {/* Titre principal */}
      <h1>Dashboard</h1>

      {/* Bouton pour créer une nouvelle checklist */}
      <Link to="/form" className="button new-button">
        + New Checklist
      </Link>

      {/* Affichage des checklists */}
      {checklists.length === 0 ? (
        <p>No checklists created yet.</p>
      ) : (
        <ul className="checklist-list">
          {checklists.map((checklist) => (
            <li key={checklist.id} className="checklist-item">
              {/* Redirige vers l'écran de détails d'une checklist */}
              <Link to={`/checklist/${checklist.id}`} className="checklist-link">
                <h2>{checklist.title}</h2>
                <p>{checklist.description}</p>
              </Link>
              <p>
                Status:{" "}
                {checklist.status === 0
                  ? "Empty"
                  : checklist.status === 1
                  ? "In Progress"
                  : "Completed"}
              </p>
              <p>
                {checklist.todo.filter((task) => task.status === 1).length} /{" "}
                {checklist.todo.length} tasks completed
              </p>
              <div className="actions">
                {/* Bouton pour modifier une checklist */}
                <Link to={`/form/${checklist.id}`} className="button edit-button">
                  Edit
                </Link>
                {/* Bouton pour supprimer une checklist */}
                <button
                  onClick={() => deleteChecklist(checklist.id)}
                  className="button delete-button"
                >
                  Delete
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
