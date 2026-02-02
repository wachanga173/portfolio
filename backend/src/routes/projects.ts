import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      'SELECT * FROM projects ORDER BY display_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await db.query('SELECT * FROM projects WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add project (admin only)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, image_url, github_url, live_url, display_order } =
      req.body;

    // Convert comma-separated technologies to JSON array
    const techArray =
      typeof technologies === 'string'
        ? technologies
            .split(',')
            .map((t: string) => t.trim())
            .filter((t: string) => t)
        : technologies;

    await db.query(
      `INSERT INTO projects (title, description, technologies, image_url, github_url, live_url, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        JSON.stringify(techArray),
        image_url,
        github_url,
        live_url,
        display_order || 0,
      ]
    );

    res.json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, image_url, github_url, live_url, display_order } =
      req.body;

    // Convert comma-separated technologies to JSON array
    const techArray =
      typeof technologies === 'string'
        ? technologies
            .split(',')
            .map((t: string) => t.trim())
            .filter((t: string) => t)
        : technologies;

    await db.query(
      `UPDATE projects 
       SET title = ?, description = ?, technologies = ?, image_url = ?, 
           github_url = ?, live_url = ?, display_order = ?
       WHERE id = ?`,
      [
        title,
        description,
        JSON.stringify(techArray),
        image_url,
        github_url,
        live_url,
        display_order,
        id,
      ]
    );

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
