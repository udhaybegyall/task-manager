'use server';

import { auth } from '@/auth';
import { API_BASE_URL } from '@/config';
import { revalidateTag } from 'next/cache';

interface Task {
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

async function authFetch(path: string, options: RequestInit = {}) {
    const session = await auth();

    if (!session?.user.accessToken) {
        throw new Error('Not authenticated');
    }

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${session.user.accessToken}`,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Error fetching', response.status, error);
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function fetchTasks() {
    try {
        return await authFetch('/tasks');
    } catch (error) {
        console.error('Error fetching tasks', error);
        throw error;
    }
}

export async function addTask(formData: FormData) {
    const taskData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: 'To Do' as const,
    };

    try {
        const task = await authFetch('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });

        revalidateTag('tasks');
        return { success: true, task };
    } catch (error) {
        console.error('Error adding task', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function updateTask(id: string, formData: FormData) {
    const taskData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: formData.get('status') as 'To Do' | 'In Progress' | 'Done',
    };

    try {
        const task = await authFetch(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        });

        revalidateTag('tasks');
        return { success: true, task };
    } catch (error) {
        console.error('Error updating task', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function deleteTask(id: string) {
    try {
        await authFetch(`/tasks/${id}`, { method: 'DELETE' });
        revalidateTag('tasks');
        return { success: true };
    } catch (error) {
        console.error('Error deleting task:', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function setReminder(id: string, reminderTime: Date) {
    try {
        const response = await authFetch(`/tasks/${id}/reminder`, {
            method: 'PATCH',
            body: JSON.stringify({ reminderTime: reminderTime.toISOString() }),
        });

        if (response.success && response.task) {
            revalidateTag('tasks');
            return { success: true, task: response.task };
        } else {
            throw new Error(response.message || 'Failed to set reminder');
        }
    } catch (error) {
        console.error('Error setting reminder:', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function acknowledgeReminder(id: string) {
    try {
        const task = await authFetch(`/tasks/${id}/acknowledge-reminder`, {
            method: 'PATCH',
        });

        revalidateTag('tasks');
        return { success: true, task };
    } catch (error) {
        console.error('Error acknowledging reminder:', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function getActiveReminders() {
    try {
        return await authFetch('/tasks/reminders');
    } catch (error) {
        console.error('Error getting active reminders:', error);
        return { success: false, error: (error as Error).message };
    }
}
