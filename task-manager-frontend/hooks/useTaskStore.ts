import { create } from 'zustand';
import {
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    setReminder,
    getActiveReminders,
    acknowledgeReminder,
} from '@/app/actions/tasks';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    reminder?: {
        time: Date;
        isAcknowledged: boolean;
    }
}

interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    filterStatus: string;
    activeReminders: Task[];
    searchTerm: string;
    fetchTasks: () => Promise<void>;
    addTask: (formData: FormData) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, formData: FormData) => Promise<void>;
    setFilterStatus: (status: string) => void;
    setSearchTerm: (term: string) => void;
    setReminder: (id: string, reminderTime: Date) => Promise<void>;
    acknowledgeReminder: (id: string) => Promise<void>;
    fetchActiveReminders: () => Promise<void>;
}

const useTaskStore = create<TaskStore>(set => ({
    tasks: [],
    isLoading: false,
    error: null,
    filterStatus: 'All',
    activeReminders: [],
    searchTerm: '',

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
    
    setSearchTerm: (term: string) => set({ searchTerm: term }),

    setReminder: async (id: string, reminderTime: Date) => {
        set({ isLoading: true });
        try {
            const result = await setReminder(id, reminderTime);
            if (result.success && result.task) {
                set(state => ({
                    tasks: state.tasks.map(task =>
                        task._id === id ? result.task : task
                    ),
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(result.error || 'Failed to set reminder');
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    acknowledgeReminder: async (taskId: string) => {
        set({ isLoading: true });
        try {
            const result = await acknowledgeReminder(taskId);
            if (result.success && result.task) {
                set(state => ({
                    tasks: state.tasks.map(task =>
                        task._id === taskId ? { ...task, reminder: result.task.reminder } : task
                    ),
                    activeReminders: state.activeReminders.filter(task => task._id !== taskId),
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(result.error || 'Failed to acknowledge reminder');
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    fetchActiveReminders: async () => {
        set({ isLoading: true });
        try {
            const reminders = await getActiveReminders();
            set({ activeReminders: reminders, isLoading: false, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch active reminders', isLoading: false });
        }
    },
}));

export default useTaskStore;
