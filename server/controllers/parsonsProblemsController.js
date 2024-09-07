const ParsonProblem = require('../models/parsonProblem');
const config = require('../config/config');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

exports.createParsonProblem = async (req, res) => {
    // check if user logged in

    const cookies = req.cookies;
    if (cookies?.access_token) {

        const accessToken = cookies.access_token;

        console.log(accessToken);

        
    }
    if (req.cookies) {
        console.log(req.cookies);
    }

    // If logged in add the pp to their user

    // Request new parson problem with ai model
    const sampleProblem = {
        ipAddress: req.ip,
        prompt: "Machine learning with regards to ducks",
        description: "Console log blah blah rah rah",
        blocks: ['line 2 code by gemini', 'line1 code by gemini'],
        solution: ['line1 code by gemini', 'line 2 code by gemini']
    };


    const newProblem = new ParsonProblem(
        {
            ipAddress: sampleProblem.ipAddress,
            prompt: sampleProblem.prompt,
            description: sampleProblem.description,
            blocks: sampleProblem.blocks,
            solution: sampleProblem.solution

        }
    );

    await newProblem.save();


    // if logged out just return the pp
    res.send(
        {
            data: {
                description: newProblem.description,
                blocks: newProblem.blocks,
                parsonProblemId: newProblem._id
            }
        }
    ).status(200);
};

exports.getFeedback = async (req, res) => {
    const parsonProblemId = req.params.id;
    try {
        const parsonProblem = await ParsonProblem.findById(parsonProblemId);

        const solution = parsonProblem.solution;

        res.send(
        {
            data: solution,
        }
        ).status(200);
    } catch (error) {
        res.send(`Internal server error: ${error}`).status(500);
    }
}