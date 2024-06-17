import ProjectModel from '../models/Project.js';

export const getLastTags = async (req, res) => {
  try {
    const projects = await ProjectModel.find().limit(5).exec();

    const tags = projects
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('user').exec();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить проекты',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const projectId = req.params.id;

    ProjectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть проект',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Проект не найден',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить проект',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const projectId = req.params.id;

    ProjectModel.findOneAndDelete(
      {
        _id: projectId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить проект',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Проект не найден',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить проекты',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ProjectModel({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      videoUrl: req.body.videoUrl,
      moneyGoal: req.body.moneyGoal,
      timeGoal: req.body.timeGoal,
      genre: req.body.genre,
      tags: req.body.tags,
      user: req.userId,
    });

    const project = await doc.save();

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать проект', err,
    });
  }
};

export const update = async (req, res) => {
  try {
    const projectId = req.params.id;

    await ProjectModel.updateOne(
      {
        _id: projectId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
        moneyGoal: req.body.moneyGoal,
        timeGoal: req.body.timeGoal,
        genre: req.body.genre,
        tags: req.body.tags,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить проект',
    });
  }
};
