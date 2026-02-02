import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all resume sections (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM resume ORDER BY section_name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching resume sections:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single resume section (public)
router.get('/:sectionName', async (req: Request, res: Response) => {
  try {
    const { sectionName } = req.params;
    const [rows]: any = await db.query('SELECT * FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching resume section:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resume section (admin only)
router.put('/:sectionName', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { sectionName } = req.params;
    const { content } = req.body;

    // Check if section exists
    const [existing]: any = await db.query('SELECT id FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (existing.length === 0) {
      // Insert new section
      await db.query('INSERT INTO resume (section_name, content) VALUES (?, ?)', [
        sectionName,
        JSON.stringify(content),
      ]);
    } else {
      // Update existing section
      await db.query('UPDATE resume SET content = ? WHERE section_name = ?', [
        JSON.stringify(content),
        sectionName,
      ]);
    }

    res.json({ message: 'Resume section updated successfully' });
  } catch (error) {
    console.error('Error updating resume section:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resume section (admin only)
router.delete('/:sectionName', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { sectionName } = req.params;
    const [result]: any = await db.query('DELETE FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.json({ message: 'Resume section deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume section:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
