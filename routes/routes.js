const express = require('express');
const Model = require('../models/model')

const router = express.Router();

/**
 * How to Write our Endpoints
 * We will have five routes for the following actions:
    Posting data to Database.
    Getting all the data from the Database.
    Getting data based on the ID.
    Updating data based on the ID.
    Deleting data based on the ID.
 */

/**
 * This router is taking the route as the first parameter. Then in the second parameter it's taking a callback.

    In the callback, we have a res and a req. res means response, and req means request. We use res for sending responses to our client, like Postman, or any front-end client. And we use req for receiving requests from a client app like Postman, or any front-end client.

    Then in the callback body, we are printing a message that says the respective API message.
 */

//post method
router.post('/post', async (req, res) => {
    // res.send('POST api')

    //Our name and age is accepting the name and age from req body. We get this data from the client app such as Postman, or any frontend client like React or Angular.
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch(error) {
        res.status(400).json({message: error.message})
    }
});

//get method
router.get('/getAll', async (req, res) => {
    // res.send("Get all api")
    try {
        // we are using the Model.find method to fetch all the data from the database.
        const data = await Model.find();
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//Get by ID method
router.get('/getOne/:id', async (req, res) => {
    // res.send(req.params.id)

    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});

//Update by ID method
router.patch('/update/:id', async (req, res) => {
    // res.send("Update by ID api")
    try {
        /**
         * we have three parameters that we are passing in the findByIdAndUpdate method, which we use to find a document by ID and update it.

        The req.params.id is the const id, updatedData which contains the req.body, and the options, which specifies whether to return the updated data in the body or not.
         */
        const id = req.params.id;
        const updateData = req.body;
        const options = {new : true};
        const result = await Model.findByIdAndUpdate(id, updateData, options);
        res.send(result);
    } catch(error) {
        res.status(400).json({message:error.message})
    }
});

//Delete by ID method
router.delete('/delete/:id', async (req,res) => {
    // res.send('Delete by ID api')
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted... `)
    } catch(error)  {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;