import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Submit feedback form (public)
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    await db.query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [name || null, email || null, phone || null, subject, message]
    );

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all feedback submissions (admin only)
router.get('/contact/submissions', authenticateToken, async (req: Request, res: Response) => {
  try {
    const [submissions]: any = await db.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    res.json(submissions);
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete feedback submission (admin only)
router.delete(
  '/contact/submissions/:id',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const [result]: any = await db.query('DELETE FROM contact_submissions WHERE id = ?', [
        req.params.id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Submission not found' });
      }

      res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
      console.error('Delete submission error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
