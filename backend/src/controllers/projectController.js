const Project = require("../models/Project");

// Controller: Create a new project
const createProject = async (req, res) => {
  try {
    const { clientId, projectName, status, description, startDate, endDate } =
      req.body;

    const newProject = new Project({
      clientId,
      projectName,
      status,
      description,
      startDate,
      endDate,
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
};

// Controller: Get all projects (Admin)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("clientId", "name email");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
};

// Controller: Get projects by client ID
const getClientProjects = async (req, res) => {
  try {
    const { clientId } = req.params;
    const projects = await Project.find({ clientId });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
};

// Controller: Update a project
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

// Controller: Delete a project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getClientProjects,
  updateProject,
  deleteProject,
};
