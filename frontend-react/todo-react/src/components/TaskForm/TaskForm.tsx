import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { FaTrash, FaCheck } from "react-icons/fa";
import { useState } from 'react';
import { createTask } from '../../services/taskService';
import type { CreateUpdateTask } from '../../types/Task';
import { TaskStatus } from '../../types/Task';
import { FaPenSquare } from "react-icons/fa";
import { patchUpdateTask } from '../../services/taskService';

interface TaskFormProps {
        id?: number;
        title?: string;
        description?: string;
        status?: TaskStatus;
        onOpenCloseAddTaskForm?: () => void;
        handleReloadList: () => void;
}

const FormAddTask = ({ id, title, description, status, onOpenCloseAddTaskForm, handleReloadList }: TaskFormProps) => {

    const [titleState, setTitleState] = useState(title? title : '');
    const [descriptionState, setDescriptionState] = useState(description? description : '');
    const [statusState, setStatusState] = useState(status? status : TaskStatus.TODO);
    const onCancelForm = () => {
        setTitleState('');
        setDescriptionState('');
        setStatusState(TaskStatus.TODO);
    };

    const onAddTask = () => {
        const formInfo: CreateUpdateTask = {
            title: titleState,
            description: descriptionState,
            status: statusState,
        };
        createTask(formInfo);
        setTitleState('');
        setDescriptionState('');
        setStatusState(TaskStatus.TODO);
        handleReloadList();
        if (onOpenCloseAddTaskForm) {
            onOpenCloseAddTaskForm();
        }
    };

    const handleEditTask = async (id: number) => {
        await patchUpdateTask(id, { title: titleState, description: descriptionState, status: statusState });
        await handleReloadList();
        if (onOpenCloseAddTaskForm) {
            onOpenCloseAddTaskForm();
        }
    };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          placeholder="Enter task title" 
          value={titleState}
          onChange={(e) => setTitleState(e.target.value)}
        />
        <Form.Label className="text-muted"><FaPenSquare /></Form.Label>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          placeholder="Enter task description" 
          as="textarea" 
          rows={3} 
          value={descriptionState}
          onChange={(e) => setDescriptionState(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select 
          value={statusState}
          onChange={(e) => setStatusState(e.target.value as TaskStatus)}
        >
          <option value={TaskStatus.TODO}>TODO</option>
          <option value={TaskStatus.IN_PROGRESS}>IN_PROGRESS</option>
          <option value={TaskStatus.COMPLETED}>COMPLETED</option>
          <option value={TaskStatus.CANCELLED}>CANCELLED</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
            <Col className="p-0" xs={6}>
                <Button
                    variant="danger"
                    className="w-100 rounded-3 text-white text-decoration-none mx-auto mt-3"
                    onClick={() => onCancelForm()}
                >
                    <FaTrash size={18} />
                </Button>
            </Col>
            <Col className="p-0" xs={6}>
                <Button
                    variant="success"
                    className="w-100 rounded-3 text-white text-decoration-none mx-auto mt-3"
                    onClick={id? () => handleEditTask(id) : () => onAddTask()}
                >
                    <FaCheck size={18} />
                </Button>
            </Col>
        </Row>
      </Form.Group>
    </>
  );
}

export default FormAddTask;