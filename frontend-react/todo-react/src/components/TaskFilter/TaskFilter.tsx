import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { TaskStatus } from '../../types/Task';
import ReactSlider from 'react-slider';
import { postFilteredSortedTasks } from '../../services/taskService';
import "./TaskFilter.css";
import Button from 'react-bootstrap/esm/Button';

interface TaskFilterProps {
    onFilter: (tasks: Task[]) => void;
}

const TaskFilter = ({ onFilter }: TaskFilterProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus[]>([]);
    const [titleAndDescription, setTitleAndDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [range, setRange] = useState<[number, number]>([20, 80]);

    const handleFilter = async () => {
        const filterSortTask = {
            title: title || undefined,
            description: description || undefined,
            titleAndDescription: titleAndDescription || undefined,
            status: status,
            createdFrom: startDate ? new Date(startDate) : undefined,
            createdTo: endDate ? new Date(endDate) : undefined,
        };
        console.log('FilterSortTask: ', filterSortTask);
        const tasks = await postFilteredSortedTasks(filterSortTask);
        console.log('Filtered Tasks: ', tasks.content);
        onFilter(tasks.content);
    };

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Tilte</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Title and Description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Title and Description" 
                    value={titleAndDescription} 
                    onChange={(e) => setTitleAndDescription(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid argument.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                {Object.values(TaskStatus).map((taskStatus) => (
                    <Form.Check
                        key={taskStatus}
                        type="checkbox"
                        label={taskStatus}
                        checked={status.includes(taskStatus)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setStatus([...status, taskStatus]);
                            } else {
                                setStatus(status.filter((s) => s !== taskStatus));
                            }
                        }}
                    />
                ))}
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Fecha inicial</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                    <Form.Label>Fecha final</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Range</Form.Label>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    value={range}
                    onChange={(value) => setRange(value as [number, number])}
                    min={0}
                    max={100}
                    step={1}
                    minDistance={1}
                    pearling
                />
                <div className="d-flex justify-content-between mt-2">
                    <span>Inicio: {range[0]}</span>
                    <span>Fin: {range[1]}</span>
                </div>
            </Form.Group>

            <Button variant="primary" onClick={handleFilter}>
                Filtrar
            </Button>
        </Form>
    );
}

export default TaskFilter;