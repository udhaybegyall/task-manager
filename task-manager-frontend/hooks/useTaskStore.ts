import { create } from 'zustand';
import {
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
} from '@/app/actions/tasks';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    filterStatus: string;
    fetchTasks: () => Promise<void>;
    addTask: (formData: FormData) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, formData: FormData) => Promise<void>;
    setFilterStatus: (status: string) => void;
}

const useTaskStore = create<TaskStore>(set => ({
    tasks: [],
    isLoading: false,
    error: null,
    filterStatus: 'All',

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const tasks = await fetchTasks();
            set({ tasks, isLoading: false, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', isLoading: false });
        }
    },

    addTask: async (formData: FormData) => {
        set({ isLoading: true });
        try {
            const result = await addTask(formData);
            if (result.success && result.task) {
                set(state => ({
                    tasks: [...state.tasks, result.task],
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(result.error || 'Failed to add task');
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateTask: async (id: string, formData: FormData) => {
        set({ isLoading: true });
        try {
            const result = await updateTask(id, formData);
            if (result.success && result.task) {
                set(state => ({
                    tasks: state.tasks.map(task =>
                        task._id === id ? result.task : task
                    ),
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(result.error || 'Failed to update task');
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    deleteTask: async (id: string) => {
        set({ isLoading: true });
        try {
            const result = await deleteTask(id);
            if (result.success) {
                set(state => ({
                    tasks: state.tasks.filter(task => task._id !== id),
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(result.error || 'Failed to delete task');
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    setFilterStatus: (status: string) => set({ filterStatus: status }),
}));

export default useTaskStore;
