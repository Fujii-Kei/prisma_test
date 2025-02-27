import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma'; 

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { date: 'desc' }, // 新しい順に並べる
    });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}
