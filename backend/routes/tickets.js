import express from 'express';
import Ticket from '../models/Ticket.js';

const router = express.Router();

//Get /api/Tickets - Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//POST /api /Tickets post all tickets
router.post('/', async(req, res) => {
    try {
       const ticket = await Ticket.create(req.body);
       res.status(201).json(ticket); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//PATCH /api/tickets/:id  Update a ticket by ID
router.patch('/:id', async (req, res) => {
 try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidate: true,
    });
    if(!ticket) return res.status(404).json({ message: 'Ticket not found'});
    res.json(ticket);
} catch (error) {
    res.status(400).json({ message: error.message });       
   }
});

//DELETE /api/tickets/:id - Delete a ticket by ID
router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if(!ticket) return res.status(404).json({ message: 'Ticket not found'});
        res.json({ message: 'Ticket deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;