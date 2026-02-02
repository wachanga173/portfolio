import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all skills (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM skills ORDER BY category, display_order ASC');
    res.json(rows);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add skill (admin only)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, category, proficiency, icon, display_order } = req.body;

    await db.query(
      'INSERT INTO skills (name, category, proficiency, icon, display_order) VALUES (?, ?, ?, ?, ?)',
      [name, category, proficiency, icon, display_order || 0]
    );

    res.json({ message: 'Skill added successfully' });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill (admin only)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, display_order } = req.body;

    await db.query(
      'UPDATE skills SET name = ?, category = ?, proficiency = ?, icon = ?, display_order = ? WHERE id = ?',
      [name, category, proficiency, icon, display_order, id]
    );

    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill (admin only)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM skills WHERE id = ?', [id]);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
