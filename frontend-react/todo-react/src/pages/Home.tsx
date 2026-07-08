import {Row} from 'react-bootstrap';
import TaskList from '../components/TaskList/TaskList';

const Home = () => {
    return (
      <>
        <Row>Header</Row>
        <Row>
            <TaskList />
        </Row>
      </>
    );
  };

export default Home;