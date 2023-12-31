import prisma from '@/utils/db';

export const GET = async (request) => {
  const tasks = await prisma.task.findMany();
  return Response.json({ data: tasks });
};

export const POST = async (request) => {
  const data = await request.json();
  const task = await prisma.task.create({
    data: {
      content: data.content,
    },
  });

  // return Response.json({ data: 'ok' });
  return Response.json({ data: task });
};
