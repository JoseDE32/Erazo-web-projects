import { useState } from 'react';
import { TaskStatus } from '../../types/Task';
import type { FilterSortTask } from '../../types/Task';
import { useEffect } from 'react';

interface UseTaskFilterProps {
    onFilter: (filters: Partial<FilterSortTask>) => void;
}

export const useTaskFilter = ({ onFilter }: UseTaskFilterProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus[]>([]);
    const [titleAndDescription, setTitleAndDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [range, setRange] = useState<[number, number]>([20, 80]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFilter({
                title: title || undefined,
                description: description || undefined,
                titleAndDescription: titleAndDescription || undefined,
                status,
                createdFrom: startDate ? new Date(startDate) : undefined,
                createdTo: endDate ? new Date(endDate) : undefined,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [
        title,
        description,
        titleAndDescription,
        status,
        startDate,
        endDate
    ]);

    const handleStatusChange = (
        taskStatus: TaskStatus,
        checked: boolean
    ) => {
        if (checked) {
            setStatus([...status, taskStatus]);
        } else {
            setStatus(status.filter(s => s !== taskStatus));
        }
    };

    const handleFilter = () => {

        const filterSortTask: Partial<FilterSortTask> = {
            title: title || undefined,
            description: description || undefined,
            titleAndDescription: titleAndDescription || undefined,
            status,
            createdFrom: startDate ? new Date(startDate) : undefined,
            createdTo: endDate ? new Date(endDate) : undefined,
        };

        onFilter(filterSortTask);
    };

    return {

        title,
        setTitle,

        description,
        setDescription,

        status,
        titleAndDescription,
        setTitleAndDescription,

        startDate,
        setStartDate,

        endDate,
        setEndDate,

        range,
        setRange,

        handleStatusChange,
        handleFilter
    };
};