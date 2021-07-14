const express = require('express');
const router = new express.Router();
const Student = require('../model/student.model');
const Subject = require('../model/subjects.model');
const Society = require('../model/society.model');

// for creating the student
router.post('/student',async (req, res) => {
    try {
        const subjects = req.body.subjects;
        const societies = req.body.societies;
        await Subject.checkSubjects(subjects);
        await Society.checkSocieties(societies);
        const student = new Student(req.body);
        console.log(student);
        await student.save();
        res.send(student);
    } catch (error)
    {
        console.log(error);
    }
})

//for getting StudentInfo

router.get('/student/:id', async(req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            res.status(404).send({ error: 'student not found' });
        res.send(student);
        
    } catch (error)
    {
        res.status(500).send({ error });
    }
})
// for adding any society
router.post('/student/society/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            res.status(404).send({ error: 'student not found' }); 
        await student.addSociety(req.body.society);
        // console.log(student);
        res.send('society added successfully');
    } catch (error)
    {
        // console.log(error);

        res.status(500).send({ error });
    }
})

// for adding any subject
router.post('/student/subject/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            res.status(404).send({ error: 'student not found' }); 
        await student.addSubject(req.body.subject);
        res.send('subject added successfully');
    } catch (error)
    {
        res.status(500).send({ error });
    }
})



const StudentRoute = router;
module.exports = StudentRoute;