

'use client';
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", deadline: "", category: "", status: "In Progress" });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (userId) fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects", {
      headers: { userId }
    });
    const data = await res.json();
    setProjects(data);
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    const projectData = { ...newProject, userId };
    if (editIndex !== null) {
      const id = projects[editIndex]._id;
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
    }

    fetchProjects();
    setNewProject({ title: "", description: "", deadline: "", category: "", status: "In Progress" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewProject(projects[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const id = projects[index]._id;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
    setEditIndex(null);
  };


  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="projects-container">
      <h2>My Projects</h2>

    
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      
      <div className="form-container">
        <input name="title" placeholder="Title" value={newProject.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newProject.description} onChange={handleChange} />
        <input type="date" name="deadline" value={newProject.deadline} onChange={handleChange} />
        <input name="category" placeholder="Category" value={newProject.category} onChange={handleChange} />
        <select name="status" value={newProject.status} onChange={handleChange}>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update Project" : "Add Project"}
        </button>
      </div>


      
      
      <div className="grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="card">
            <h3>{project.title}</h3>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>
            <p><strong>Category:</strong> {project.category}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <div className="btn-group">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
