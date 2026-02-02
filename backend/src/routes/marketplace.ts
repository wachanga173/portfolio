import express, { Request, Response } from 'express';
import db from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all marketplace products (public)
router.get('/products', async (req: Request, res: Response) => {
  try {
    const [products]: any = await db.query(`
      SELECT id, name, description, price, icon, features, display_order
      FROM marketplace_products
      WHERE is_active = TRUE
      ORDER BY display_order ASC, id ASC
    `);

    // Parse JSON features
    const parsedProducts = products.map((product: any) => ({
      ...product,
      features:
        typeof product.features === 'string' ? JSON.parse(product.features) : product.features,
    }));

    res.json(parsedProducts);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product (public)
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const [products]: any = await db.query(
      'SELECT * FROM marketplace_products WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = products[0];
    product.features =
      typeof product.features === 'string' ? JSON.parse(product.features) : product.features;

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/products', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, description, price, icon, features, display_order } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const [result]: any = await db.query(
      `INSERT INTO marketplace_products (name, description, price, icon, features, display_order) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        price,
        icon || 'FaShoppingCart',
        JSON.stringify(features || []),
        display_order || 0,
      ]
    );

    res.status(201).json({
      message: 'Product created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (admin only)
router.put('/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, description, price, icon, features, display_order, is_active } = req.body;

    const [result]: any = await db.query(
      `UPDATE marketplace_products 
       SET name = ?, description = ?, price = ?, icon = ?, features = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [
        name,
        description,
        price,
        icon,
        JSON.stringify(features),
        display_order,
        is_active !== undefined ? is_active : true,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Soft delete - mark as inactive
    const [result]: any = await db.query(
      'UPDATE marketplace_products SET is_active = FALSE WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
