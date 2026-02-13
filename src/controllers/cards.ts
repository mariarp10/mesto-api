import { Request, Response } from 'express';
import Card from '../models/card';
import { AuthRequest } from '../types';

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const userId = (req as AuthRequest).user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = (req as AuthRequest).user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

export const removeLike = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = (req as AuthRequest).user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректный id карточки' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
