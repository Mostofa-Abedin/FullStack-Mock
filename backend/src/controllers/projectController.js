import Project from "../models/Project.js";


// Controller: Create a new project
const createProject = async (req, res) => {
    try {
      console.log("Received project creation request:", req.body); // Debugging log
  
      const { clientId, projectName, status, description, startDate, endDate } = req.body;
  
      if (!clientId || !projectName || !status || !startDate || !endDate) {

        console.error("❌ Missing required fields:", req.body);

        return res.status(400).json({ message: "All fields are required" });
      }
  
      const project = new Project({ clientId, projectName, status, description, startDate, endDate });
  
      await project.save();
      res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Failed to create project", error });
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
  
      // Ensure only the client themselves can access this
      if (req.user.role !== 'client' || req.user.userID !== clientId) {
        return res.status(403).json({ message: "Access denied. Clients can only retrieve their own projects." });
      }
  
      const projects = await Project.find({ clientId });
  
      res.status(200).json({ projects });
    } catch (error) {
      console.error("Error fetching client projects:", error);
      res.status(500).json({ message: "Failed to retrieve projects", error });
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

export { createProject, getAllProjects, getClientProjects, updateProject, deleteProject };
