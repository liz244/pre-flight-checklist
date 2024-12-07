import React, { useState, useEffect } from "react"; // Pour useState et useEffect
import { useParams, useNavigate } from "react-router-dom"; // Pour useParams et useNavigate
import api from "../services/api"; // Pour appeler les fonctions API


function ChecklistForm() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL (s'il existe)
  const navigate = useNavigate(); // Pour rediriger vers le dashboard

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  // Charger les données si on modifie une checklist existante
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

  // Fonction pour ajouter une nouvelle tâche
  function addTask() {
    setTasks([...tasks, { title: "", description: "", status: 0 }]);
  }

  // Fonction pour mettre à jour une tâche existante
  function updateTask(index, field, value) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  }

  // Fonction pour supprimer une tâche
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Sauvegarder la checklist (création ou modification)
  async function saveChecklist() {
    try {
      if (id) {
        // Modifier une checklist existante
        await api.post("checklist/update", {
          id,
          title,
          description,
          todo: tasks,
        });
      } else {
        // Créer une nouvelle checklist
        await api.post("checklist/add", {
          title,
          description,
          todo: tasks,
        });
      }
      navigate("/"); // Retour au dashboard
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  }

  return (
    <div className="form">
      {/* Titre principal Form et sous-titre dynamique */}
      <h1>Form</h1>
      <h2>{id ? "Edit Checklist" : "New Checklist"}</h2>

      {/* Champs pour le titre et la description */}
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

      {/* Boutons de sauvegarde et retour */}
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
