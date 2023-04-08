import moment from 'moment'
import {  FaCalendarAlt } from 'react-icons/fa'//FaLocationArrow, FaBriefcase
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Task'
import TaskInfo from './TaskInfo'

const Task = ({
  _id,
  position,
  Priority,
  Description,
  
  createdAt,
  status,
}) => {
  const { setEditJob, deleteTask } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'></div>
        <div className='info'>
          <h5>{position}</h5>
          <p > {Description}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          <TaskInfo text={status} />
          <TaskInfo text={Priority} />
          
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-task'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Task
