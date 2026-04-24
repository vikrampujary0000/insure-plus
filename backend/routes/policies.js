const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { premium, duration } = req.body;
        const coverage = premium * duration * 10;
        const policy = new Policy({ ...req.body, coverage });
        const saved = await policy.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { premium, duration } = req.body;
        const coverage = premium * duration;
        const updated = await Policy.findByIdAndUpdate(
            req.params.id,
            { ...req.body, coverage },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Policy.findByIdAndDelete(req.params.id);
        res.json({ message: 'Policy deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;