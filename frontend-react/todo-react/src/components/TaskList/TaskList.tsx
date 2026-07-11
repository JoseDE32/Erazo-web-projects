import type { Task } from '../../types/Task';
import TaskCard from '../TaskCard/TaskCard';
import TaskForm from '../TaskForm/TaskForm';
import { Row, Col, Button, Accordion} from 'react-bootstrap';

import { FaPlusSquare } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import TaskFilter from '../TaskFilter/TaskFilter';

import { useTaskList } from './useTaskList';

const TaskList = () => {

    const {
        taskListToShow,
        showAddTaskForm,
        handleStatusChange,
        handleDelete,
        handleReloadList,
        onOpenCloseAddTaskForm,
        isLoading,
        isError,
        setFilters
    } = useTaskList();
    
    if (isError) {
        return (
            <Row>
                <Col xs={12} className="text-center mt-3">
                    <span>Error</span>
                </Col>
            </Row>
        );
    }

    return (

        <Row>
            <Col xs={12}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Filters</Accordion.Header>
                        <Accordion.Body>
                            <TaskFilter onFilter={setFilters}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
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

            {isLoading ? (
                <Col xs={12} className="text-center mt-3">
                    <span>Loading...</span>
                </Col>
            ) : (
                    taskListToShow?.map((task: Task) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={task.id}>
                            <TaskCard task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} handleReloadList={handleReloadList} />
                        </Col>
                    ))
                )
            } 

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