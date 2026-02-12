import { Router } from 'express';
import {
  createCard, getCards, deleteCard, likeCard, removeLike,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLike);

export default router;
