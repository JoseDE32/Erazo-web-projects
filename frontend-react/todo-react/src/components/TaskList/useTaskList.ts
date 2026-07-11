import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TaskStatus } from '../../types/Task';
import type { FilterSortTask } from '../../types/Task';

import {
    postFilteredSortedTasks,
    patchUpdateTask,
    deleteTask
} from '../../services/taskService';

export const useTaskList = () => {

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [filters, setFilters] = useState<Partial<FilterSortTask>>({});

    const {
        data: taskListToShow = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['tasks', filters],
        queryFn: async () => {
            const filteredSortedTasks = await postFilteredSortedTasks(filters);
            return filteredSortedTasks.content;
        }
    });

    const handleReloadList = async () => {
        await refetch();
    };

    const handleStatusChange = async (
        id: number,
        status: TaskStatus
    ) => {
        await patchUpdateTask(id, { status });
        await handleReloadList();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        await handleReloadList();
    };

    const onOpenCloseAddTaskForm = () => {
        setShowAddTaskForm(prev => !prev);
    };

    return {
        taskListToShow,
        showAddTaskForm,
        handleStatusChange,
        handleDelete,
        handleReloadList,
        onOpenCloseAddTaskForm,
        isLoading,
        isError,
        error,
        setFilters
    };
};