import Job from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job }); // 201 status code means the request has been fulfilled and has resulted in one or more new resources being created
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job }); // 200 status code means the request has succeeded
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true, // returns the updated document
  });

  if (!updatedJob) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  res.status(200).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  res.status(200).json({ msg: 'job deleted', job: removedJob });
};
