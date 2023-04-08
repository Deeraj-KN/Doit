import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Task from './Task';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/TasksContainer';
import PageBtnContainer from './PageBtnContainer';

const TasksContainer = () => {
  const {
    gettasks,
    tasks,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();
  useEffect(() => {
    gettasks();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} task{tasks.length > 1 && 's'} found
      </h5>
      <div className='tasks'>
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TasksContainer;
