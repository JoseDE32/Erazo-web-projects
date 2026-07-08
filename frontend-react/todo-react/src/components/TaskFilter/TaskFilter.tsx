import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { TaskStatus } from '../../types/Task';
import ReactSlider from 'react-slider';
import "./TaskFilter.css";

function TaskFilter() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [range, setRange] = useState<[number, number]>([20, 80]);

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Tilte</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    defaultValue="Otto"
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
                <Form.Control type="text" placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid argument.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                {Object.values(TaskStatus).map((status) => (
                    <Form.Check
                        key={status}
                        label={status}
                        value={status}
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
        </Form>
    );
}

export default TaskFilter;