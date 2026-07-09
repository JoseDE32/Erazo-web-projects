import type { Task } from '../../types/Task';
import { TaskStatus } from '../../types/Task';
import TaskCard from '../TaskCard/TaskCard';
import TaskForm from '../TaskForm/TaskForm';
import { Row, Col, Button} from 'react-bootstrap';
import { getAllTasks, patchUpdateTask, deleteTask } from '../../services/taskService';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import TaskFilter from '../TaskFilter/TaskFilter';

const TaskList = () => {

    const [TaskListToShow, setTaskListToShow] = useState<Task[]>([]);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const updateTaskList = async () => {
        const tasks = await getAllTasks();
        setTaskListToShow(tasks);
    };

    const handleStatusChange = async (id: number, status: TaskStatus) => {
        await patchUpdateTask(id, { status });
        await handleReloadList();
    };
  
    const handleDelete = async (id: number) => {
        await deleteTask(id);
        await handleReloadList();
    };

    const handleReloadList = async () => {
        await updateTaskList();
    };
    const onOpenCloseAddTaskForm = () => {
        setShowAddTaskForm(!showAddTaskForm);
    };

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await getAllTasks();
            setTaskListToShow(tasks);
        };
        
        loadTasks();
    }, []);

    return (
        <Row>
            <Col xs={12}>
                <TaskFilter onFilter={setTaskListToShow}/>
            </Col>
          <Col xs={12}>
            <Button
                variant="primary"
                className="w-100 rounded-3 text-white text-decoration-none mx-auto mt-3"
                onClick={() => onOpenCloseAddTaskForm()}
            >
              <FaPlusSquare size={24} />
            </Button>          
            </Col>
          {TaskListToShow?.map((task: Task) => (
            <Col xs={12} sm={6} md={4} lg={3} key={task.id}>
              <TaskCard task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} handleReloadList={handleReloadList} />
            </Col>
          ))}

          {
            showAddTaskForm && (
            <Modal
                show={showAddTaskForm}
                onHide={onOpenCloseAddTaskForm}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TaskForm onOpenCloseAddTaskForm={onOpenCloseAddTaskForm} handleReloadList={handleReloadList}/>
                </Modal.Body>
            </Modal>
            )
          }

        </Row>
    );
  };

export default TaskList;