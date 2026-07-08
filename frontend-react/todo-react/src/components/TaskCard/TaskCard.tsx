import type { Task } from '../../types/Task';
import {TaskStatus} from '../../types/Task';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';

interface TaskCardProps {
    task: Task;
    onStatusChange: (id: number, status: TaskStatus) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    handleReloadList: () => Promise<void>;
}

const TaskCard = ({ task, onStatusChange, onDelete, handleReloadList }: TaskCardProps) => {

    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const onOpenCloseAddTaskForm = () => {
        setShowEditTaskForm(!showEditTaskForm);
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
    
    return (
    <Card>
      <Card.Body>
        <Card.Title className="fw-bold">{task.title} 
            <FaPencilAlt className="float-end" onClick={() => onOpenCloseAddTaskForm()} /> 
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{getStatusText(task.status)}</Card.Subtitle>
        <Card.Text>
          {task.description}
        </Card.Text>
        <Row className="mt-3 border-top">
            <Col className="p-0" xs={6}>
                <Button
                    variant="link"
                    className={`w-100 rounded-0 border-end text-decoration-none fw-bold ${task.status == 'TODO' ? 'text-secondary disabled' : 'text-primary'}`}                
                    onClick={() => onStatusChange(task.id, TaskStatus.TODO)}>
                    {getStatusText('TODO')}
                </Button>
            </Col>

            <Col className="p-0" xs={6}>
                <Button
                    variant="link"
                    className={`w-100 rounded-0 border-end text-decoration-none fw-bold ${task.status == 'IN_PROGRESS' ? 'text-secondary disabled' : 'text-warning'}`}
                    onClick={() => onStatusChange(task.id, TaskStatus.IN_PROGRESS)}
                >
                    {getStatusText('IN_PROGRESS')}
                </Button>
            </Col>

            <Col className="p-0" xs={6}>
                <Button
                    variant="link"
                    className={`w-100 rounded-0 border-end text-decoration-none fw-bold ${task.status == 'COMPLETED' ? 'text-secondary disabled' : 'text-success'}`}
                    onClick={() => onStatusChange(task.id, TaskStatus.COMPLETED)}
                >
                    {getStatusText('COMPLETED')}
                </Button>
            </Col>

            <Col className="p-0" xs={6}>
                <Button
                    variant="link"
                    className={`w-100 rounded-0 border-end text-decoration-none fw-bold ${task.status == 'CANCELLED' ? 'text-secondary disabled' : 'text-danger'}`}
                    onClick={() => onStatusChange(task.id, TaskStatus.CANCELLED)}
                >
                    {getStatusText('CANCELLED')}
                </Button>
            </Col>
            
            <Col className="p-0" xs={1}></Col>
            <Col className="p-0" xs={10}>
                <Button
                    variant="danger"
                    className="w-100 rounded-3 text-white text-decoration-none mx-auto mt-3"
                    onClick={() => onDelete(task.id)}
                >
                    <FaTrash size={18} />
                </Button>
            </Col>
            <Col className="p-0" xs={1}></Col>
        </Row>
      </Card.Body>

       {
            showEditTaskForm && (
            <Modal
                show={showEditTaskForm}
                onHide={onOpenCloseAddTaskForm}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TaskForm id={task.id} title={task.title} description={task.description} status={task.status} onOpenCloseAddTaskForm={onOpenCloseAddTaskForm} handleReloadList={handleReloadList} />
                </Modal.Body>
            </Modal>
            )
        }
    </Card>
    );
};

export default TaskCard;