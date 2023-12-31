'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from './db';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getTask = async (id) => {
  return await prisma.task.findUnique({
    where: { id },
  });
};

export const createTask = async (formData) => {
  const content = formData.get('content');

  await prisma.task.create({
    data: { content },
  });

  revalidatePath('/tasks');
};

export const createTaskCustom = async (prevState, formData) => {
  const content = formData.get('content');
  const Task = z.object({
    content: z.string().min(5),
  });

  try {
    Task.parse({ content });
    await prisma.task.create({
      data: { content },
    });
    revalidatePath('/tasks');
    return { msg: 'success' };
  } catch (error) {
    return { msg: 'error' };
  }
};

export const deleteTask = async (formData) => {
  const id = formData.get('id');

  await prisma.task.delete({
    where: { id },
  });

  revalidatePath('/tasks');
};

export const deleteTaskCustom = async (prevState, formData) => {
  const id = formData.get('id');

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await prisma.task.delete({
      where: { id },
    });
    revalidatePath('/tasks');
    return { msg: 'success' };
  } catch (error) {
    return { msg: 'error' };
  }
};

export const editTask = async (formData) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed') === 'on';

  await prisma.task.update({
    where: { id },
    data: { content, completed },
  });

  redirect('/tasks');
};
