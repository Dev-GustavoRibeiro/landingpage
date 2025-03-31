import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const feedbacks = await prisma.feedback.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 50
      });
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
      res.status(500).json({ message: 'Erro ao buscar feedbacks' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, rating, comment, service } = req.body;

      // Validação básica
      if (!name || !rating || !service) {
        return res.status(400).json({ message: 'Nome, avaliação e serviço são obrigatórios' });
      }
      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'A avaliação deve ser um número entre 1 e 5' });
      }

      const newFeedback = await prisma.feedback.create({
        data: {
          name,
          email: email || null,
          rating,
          comment: comment || null,
          service
        }
      });
      
      res.status(201).json(newFeedback);
    } catch (error) {
      console.error('Erro ao criar feedback:', error);
      res.status(500).json({ message: 'Erro ao criar feedback' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}