import { PartialCreditCard } from '../models/types';

function validateCardDigitSet(digitSet: string): boolean {
    // TODO regex validate only numbers
    // TODO regex lenght is exactly 4 symbols
    return true;
}

function validateCardDate(date: string): boolean {
    // TODO regex validate date format MM.YYYY
    return true;
}

function validateCardType(cardType: string): boolean {
    // TODO validate card types from list
    return true;
}

function validatePartialCreditCard(partialCreditCard: PartialCreditCard): boolean {
    if (!validateCardDigitSet(partialCreditCard.trailingDigits))
        return false;

    if (partialCreditCard.leadingDigits && !validateCardDigitSet(partialCreditCard.leadingDigits))
        return false;

    if (partialCreditCard.cardType && !validateCardType(partialCreditCard.cardType))
        return false;

    if (partialCreditCard.startDate && !validateCardDate(partialCreditCard.startDate))
        return false;

    if (partialCreditCard.expiryDate && !validateCardDate(partialCreditCard.expiryDate))
        return false;

    return true;
}

export {
    validateCardDigitSet,
    validateCardDate,
    validateCardType,
    validatePartialCreditCard
};