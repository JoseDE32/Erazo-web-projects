import { useState } from 'react';

export const useTaskCard = () => {

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);

    const onOpenCloseAddTaskForm = () => {
        setShowEditTaskForm(prev => !prev);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'TODO':
                return 'Todo';
            case 'IN_PROGRESS':
                return 'In Progress';
            case 'COMPLETED':
                return 'Completed';
            case 'CANCELLED':
                return 'Cancelled';
            default:
                return '';
        }
    };

    return {
        showEditTaskForm,
        onOpenCloseAddTaskForm,
        getStatusText
    };
};