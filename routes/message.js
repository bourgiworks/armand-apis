const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// const check_auth =require('../middleware/check_auth');

// Submit a Comment

router.post('/PostMessage', (req, res) => {
        
    var createComment = new Message ({
    
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
   
    });
    createComment.save().then((post)=>{
        res.send(post) 
       console.log(post)
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
 *         - comment
 *         - like
 *         
 *       properties:
 *         
 *         name:
 *           type: string
 *         
 *         comment:
 *           type: string
 *           
 *         like:
 *           type: number
 *           
 *           
 *         
 *       
 */
/**
  * @swagger
  * tags:
  *   name:  Comment
  *   description: adding comment on article
  */
/**
 * @swagger
 * /api/PostComment:
 *   post:
 *     summary: post a comment
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: acccount created 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
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
 * /api/getAllComment:
 *   get:
 *     summary: return list of all Comments
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: The list of Comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

//get specific comment
router.get('/GetOneMessage/:postId', async (req,res)=>{
    const post = await Message.findById(req.params.postId);
    res.json(post)
       
   });
    /**
 * @swagger
 * /api/GetOneComment/{id}:
 *   get:
 *     summary: Comment by id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: Tthi is discription of comment by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 */

   // delete specific commemt

router.delete ('/DeleteMessage/:postId', async (req,res) =>{
    const post = await Message.deleteOne({_id: req.params.postId});
    res.json({message : " Message Deleted"});

});
/**
 * @swagger
 * /api/DeleteComment/{id}:
 *   delete:
 *     summary: remove Comment 
 *     security:
 *      - ApiKeyAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 * 
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       404:
 *         description: The comment was not found
 */

module.exports = router