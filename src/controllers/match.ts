import { Request, Response } from 'express';
import { findMatchingCustomers } from '../database/data';
import { validatePartialCreditCard } from '../utils/validators';
import { PartialCreditCard, PublicCustomer } from '../models/types';

export default (req: Request, res: Response) => {

  const partialCreditCard = req.query;

  if (!partialCreditCard.trailingDigits) {
    return res
      .status(400)
      .json({ error: 'Trailing digits are required' });
  }

  const validPartialCreditCard: PartialCreditCard = {
    // TODO assign this from req.query
    trailingDigits: ""
  };
  for (const key in partialCreditCard) {
    if (partialCreditCard.hasOwnProperty(key) && typeof partialCreditCard[key] !== 'undefined') {
      validPartialCreditCard[key] = partialCreditCard[key];
    }
  }

  if (!validatePartialCreditCard(validPartialCreditCard)) {
    return res
      .status(400)
      .json({ error: 'Data are not valid data of credit card' });
  }

  const matchingCustomers: PublicCustomer[] = findMatchingCustomers(validPartialCreditCard);
  res.json(matchingCustomers);
}
