import { Request, Response } from 'express';
import { linkCustomer } from '../database/data';
import { Customer, PartialCreditCard } from '../models/types';
import { validatePartialCreditCard } from '../utils/validators';

export default (req: Request, res: Response) => {
    const { partialCreditCard, customer } = req.body;

    if (!validateRequiredFields(partialCreditCard, customer)) {
        return res
            .status(400)
            .json({ error: 'Trailing digits, customer email, and customer first name are required' });
    }

    const validPartialCreditCard: PartialCreditCard = {
        trailingDigits: partialCreditCard.trailingDigits
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

    linkCustomer({ ...customer, creditCard: validPartialCreditCard })
    res.sendStatus(200);
}

function validateRequiredFields(partialCreditCard: PartialCreditCard, customer: Customer): boolean {
    if (!partialCreditCard.trailingDigits || !customer.email || !customer.firstName) {
        return false;
    }
    return true;
}
