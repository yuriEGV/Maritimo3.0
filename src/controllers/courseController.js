const Course = require('../models/courseModel');

class CourseController {
    // Create a new course
    static async createCourse(req, res) {
        try {
            const course = new Course(req.body);
            await course.save();
            res.status(201).json(course);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get all courses
    static async getCourses(req, res) {
        try {
            const courses = await Course.find().populate('teacherId', 'name email');
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get courses by tenant
    static async getCoursesByTenant(req, res) {
        try {
            const courses = await Course.find({ tenantId: req.params.tenantId }).populate('teacherId', 'name email');
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a single course by ID
    static async getCourseById(req, res) {
        try {
            const course = await Course.findById(req.params.id).populate('teacherId', 'name email');
            if (!course) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a course by ID
    static async updateCourse(req, res) {
        try {
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('teacherId', 'name email');
            if (!course) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete a course by ID
    static async deleteCourse(req, res) {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CourseController;
