const { Router } = require('express');
const { Task } = require('../../db/models');

const tasksRouter = Router();

tasksRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allTasks = await Task.findAll();
      res.status(200).json(allTasks);
    } catch (error) {
      console.error('Ошибка получения всех задач:', error);
      res.status(500).json({
        message: 'Ошибка получения всех задач',
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTask = await Task.create({ title, description });
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
      res.status(500).json({
        message: 'Ошибка добавления задачи',
      });
    }
  });

tasksRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      res.json(task);
    } catch (error) {
      console.error('Ошибка получения задачи:', error);
      res.status(500).json({
        message: 'Ошибка получения задачи',
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      await task.destroy();
      res.sendStatus(204);
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
      res.status(500).json({
        message: 'Ошибка удаления задачи',
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      await task.update({ title, description });
      res.json(task);
    } catch (error) {
      console.error('Ошибка редактирования задачи:', error);
      res.status(500).json({
        message: 'Ошибка редактирования задачи',
      });
    }
  });

module.exports = tasksRouter;
