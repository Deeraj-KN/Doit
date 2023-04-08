import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddTask = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    Description,
    Priority,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createTask,
    editJob,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!Description || !Priority ) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createTask()
  }
  const handleTaskInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit task' : 'add task'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* Description */}
          <FormRow
            type='text'
            name='Description'
            value={Description}
            handleChange={handleTaskInput}
          />
          {/* Priority */}
          <FormRow
            type='number'
            name='Priority'
            value={Priority}
          
            handleChange={handleTaskInput}
          />
          
          {/* task status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleTaskInput}
            list={statusOptions}
          />
          
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddTask
