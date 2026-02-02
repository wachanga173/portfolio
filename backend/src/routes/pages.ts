import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get page by slug (public)
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const [rows]: any = await db.query('SELECT * FROM pages WHERE slug = ?', [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update or create page (admin only)
router.put('/:slug', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;

    const [existing]: any = await db.query('SELECT * FROM pages WHERE slug = ?', [slug]);

    if (existing.length === 0) {
      await db.query('INSERT INTO pages (slug, title, content) VALUES (?, ?, ?)', [
        slug,
        title,
        content,
      ]);
    } else {
      await db.query('UPDATE pages SET title = ?, content = ? WHERE slug = ?', [
        title,
        content,
        slug,
      ]);
    }

    res.json({ message: 'Page updated successfully' });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
