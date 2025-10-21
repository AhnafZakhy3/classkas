const { Reminder } = require('../models');

const getReminders = async (req, res) => {
  try {
    // All users can see all reminders
    const reminders = await Reminder.findAll({
      order: [['dueDate', 'ASC']],
    });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createReminder = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const reminder = await Reminder.create({
      title,
      description,
      dueDate,
      status: status || 'active',
      userId: req.user.id,
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    const reminder = await Reminder.findOne({
      where: { id, userId: req.user.id },
    });

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    await reminder.update({ title, description, dueDate, status });
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      where: { id, userId: req.user.id },
    });

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    await reminder.destroy();
    res.json({ message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReminders, createReminder, updateReminder, deleteReminder };
