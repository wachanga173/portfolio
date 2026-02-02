import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllResumeSections = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM resume ORDER BY section_name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching resume sections:', error);
    res.status(500).json({ error: 'Failed to fetch resume sections' });
  }
};

export const getResumeSection = async (req: Request, res: Response) => {
  try {
    const { sectionName } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching resume section:', error);
    res.status(500).json({ error: 'Failed to fetch resume section' });
  }
};

export const updateResumeSection = async (req: Request, res: Response) => {
  try {
    const { sectionName } = req.params;
    const { content } = req.body;

    // Check if section exists
    const [existing]: any = await pool.query('SELECT id FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (existing.length === 0) {
      // Insert new section
      await pool.query('INSERT INTO resume (section_name, content) VALUES (?, ?)', [
        sectionName,
        JSON.stringify(content),
      ]);
    } else {
      // Update existing section
      await pool.query('UPDATE resume SET content = ? WHERE section_name = ?', [
        JSON.stringify(content),
        sectionName,
      ]);
    }

    res.json({ message: 'Resume section updated successfully' });
  } catch (error) {
    console.error('Error updating resume section:', error);
    res.status(500).json({ error: 'Failed to update resume section' });
  }
};

export const deleteResumeSection = async (req: Request, res: Response) => {
  try {
    const { sectionName } = req.params;
    const [result]: any = await pool.query('DELETE FROM resume WHERE section_name = ?', [
      sectionName,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.json({ message: 'Resume section deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume section:', error);
    res.status(500).json({ error: 'Failed to delete resume section' });
  }
};
