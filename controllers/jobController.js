import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const newJob = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job: newJob });
};

export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Вакансію не знайдено" });
  }

  if (req.user.userId !== job.createdBy.toString()) {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: "Доступ заборонено" });
  }

  res.status(StatusCodes.OK).json({ job });
};

export const editJobById = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Вакансія успішно оновлена", job: updatedJob });
};

export const deleteJobById = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Вакансія успішно видалена", job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: `$status`, count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  // СТАТИСТИКА
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: `$createdAt` }, month: { $month: `$createdAt` } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format(`MMM YY`);

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
