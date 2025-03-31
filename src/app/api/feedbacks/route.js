import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Rota GET - Buscar feedbacks
export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('❌ Erro no GET /api/feedbacks:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar feedbacks', error: String(error) },
      { status: 500 }
    );
  }
}

// Rota POST - Criar novo feedback
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, rating, comment, service } = body;

    // Validação
    if (!name || !rating || !service) {
      return NextResponse.json(
        { message: 'Nome, avaliação e serviço são obrigatórios' },
        { status: 400 }
      );
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'A avaliação deve ser um número entre 1 e 5' },
        { status: 400 }
      );
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

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('❌ Erro no POST /api/feedbacks:', error);
    return NextResponse.json(
      { message: 'Erro ao criar feedback', error: String(error) },
      { status: 500 }
    );
  }
}
