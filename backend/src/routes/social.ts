import express, { Request, Response } from 'express';
import db from '../config/database';
import { encrypt, decrypt } from '../utils/encryption';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all social links (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM social_links ORDER BY display_order ASC');

    const decryptedLinks = rows.map((link: any) => ({
      id: link.id,
      platform: link.platform,
      url: decrypt(link.url_encrypted),
      icon: link.icon,
      display_order: link.display_order,
    }));

    res.json(decryptedLinks);
  } catch (error) {
    console.error('Get social links error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add social link (admin only)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { platform, url, icon, display_order } = req.body;
    const urlEncrypted = encrypt(url);

    await db.query(
      'INSERT INTO social_links (platform, url_encrypted, icon, display_order) VALUES (?, ?, ?, ?)',
      [platform, urlEncrypted, icon, display_order || 0]
    );

    res.json({ message: 'Social link added successfully' });
  } catch (error) {
    console.error('Add social link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update social link (admin only)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { platform, url, icon, display_order } = req.body;
    const urlEncrypted = encrypt(url);

    await db.query(
      'UPDATE social_links SET platform = ?, url_encrypted = ?, icon = ?, display_order = ? WHERE id = ?',
      [platform, urlEncrypted, icon, display_order, id]
    );

    res.json({ message: 'Social link updated successfully' });
  } catch (error) {
    console.error('Update social link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete social link (admin only)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM social_links WHERE id = ?', [id]);
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    console.error('Delete social link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
