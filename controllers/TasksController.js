import Task from '../models/Task.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';
const createTask = async (req, res) => {
  const { Description, Priority } = req.body;

  if (!Description || !Priority) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};
const getAllTasks = async (req, res) => {
  const { status,  sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status;
  }
  
  if (search) {
    queryObject.Description = { $regex: search, $options: 'i' };
  }
  // NO AWAIT

  let result = Task.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('Description');
  }
  if (sort === 'Priority') {
    result = result.sort('Priority');
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const tasks = await result;

  const totalJobs = await Task.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ tasks, totalJobs, numOfPages });
};
const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { Priority, Description } = req.body;

  if (!Description || !Priority) {
    throw new BadRequestError('Please provide all values');
  }
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`);
  }
  // check permissions

  checkPermissions(req.user, task.createdBy);

  const updatedJob = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`);
  }

  checkPermissions(req.user, task.createdBy);

  await task.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Task removed' });
};
const showStats = async (req, res) => {
  let stats = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Pending: stats.Pending || 0,
    Inprogress: stats.Inprogress || 0,
    Done: stats.Done || 0,
  };

  let monthlyApplications = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createTask, deleteTask, getAllTasks, updateTask, showStats };
