import express, { Request, Response } from 'express';
import db from '../config/database';
import { encrypt, decrypt } from '../utils/encryption';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get profile (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM profile LIMIT 1');

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const profile = rows[0];

    // Decrypt sensitive fields
    res.json({
      id: profile.id,
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      image_url: profile.image_url,
      phone: profile.phone_encrypted ? decrypt(profile.phone_encrypted) : null,
      email: profile.email_encrypted ? decrypt(profile.email_encrypted) : null,
      whatsapp: profile.whatsapp_encrypted ? decrypt(profile.whatsapp_encrypted) : null,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile (admin only)
router.put('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, title, bio, image_url, phone, email, whatsapp } = req.body;

    // Encrypt sensitive fields
    const phoneEncrypted = phone ? encrypt(phone) : null;
    const emailEncrypted = email ? encrypt(email) : null;
    const whatsappEncrypted = whatsapp ? encrypt(whatsapp) : null;

    const [existing]: any = await db.query('SELECT * FROM profile LIMIT 1');

    if (existing.length === 0) {
      await db.query(
        `INSERT INTO profile (name, title, bio, image_url, phone_encrypted, email_encrypted, whatsapp_encrypted)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, title, bio, image_url, phoneEncrypted, emailEncrypted, whatsappEncrypted]
      );
    } else {
      await db.query(
        `UPDATE profile 
         SET name = ?, title = ?, bio = ?, image_url = ?, 
             phone_encrypted = ?, email_encrypted = ?, whatsapp_encrypted = ?
         WHERE id = ?`,
        [
          name,
          title,
          bio,
          image_url,
          phoneEncrypted,
          emailEncrypted,
          whatsappEncrypted,
          existing[0].id,
        ]
      );
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
