const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// const check_auth =require('../middleware/check_auth');

// Submit a Message

router.post('/PostMessage',  (req, res) => {
        
    var createMessage = new Message ({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
    });
    createMessage.save().then((post)=>{
        res.send(post) 
       console.log(post)
       res.status(200).json({
        message:"Message sent"

    });
});
 /**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: 
 *       type: apiKey
 *       in: header
 *       name: auth-token
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *         
 *       properties:
 *         
 *         name:
 *           type: string
 *         
 *         email:
 *           type: string
 *           
 *         message:
 *           type: string
 *           
 *           
 *         
 *       
 */
/**
  * @swagger
  * tags:
  *   name:  Message
  *   description: sending message
  */
/**
 * @swagger
 * /api/PostMessage:
 *   post:
 *     summary: post a message
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: message sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Some server error
 */

//Get all comment
router.get('/getAllMessage', async (req,res) => {
    const post = await Message.find()
   res.json(post)

});
/**
 * @swagger
 * /api/getAllMessage:
 *   get:
 *     summary: return list of all Message
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: The list of Message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */

//get specific cmessage
router.get('/GetOneMessage/:postId', async (req,res)=>{
    const post = await Message.findById(req.params.postId);
    res.json(post)
       
   });
    /**
 * @swagger
 * /api/GetOneMessage/{id}:
 *   get:
 *     summary: Message by id
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: Tthi is discription of message by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The message was not found
 */

   // delete specific message

router.delete ('/DeleteMessage/:postId', async (req,res) =>{
    const post = await Message.deleteOne({_id: req.params.postId});
    res.json({message : " Message Deleted"});

});
/**
 * @swagger
 * /api/DeleteMessage/{id}:
 *   delete:
 *     summary: remove Message 
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 * 
 *     responses:
 *       200:
 *         description: The message was deleted
 *       404:
 *         description: The message was not found
 */

module.exports = router