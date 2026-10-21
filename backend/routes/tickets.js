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

export default router;