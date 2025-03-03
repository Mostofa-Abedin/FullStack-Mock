import './setup/dbSetup.js'; // Import centralized DB setup
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../server.js'; // Import Express app
import Project from '../models/Project.js';
import User from '../models/User.js';


// ------------------------------------------------------------------------------------------------------------------//
// SECTION: Project Routes





// ------------------------------------------------------------------------------------------------------------------