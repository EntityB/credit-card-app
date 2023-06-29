/* There would be connector to the persistent storage. 
 * But since storage is out of scope, there is simple session based implementation. 
 *
 */

import { Customer, PartialCreditCard, PublicCustomer } from '../models/types';

const _customers: Customer[] = [];

function findMatchingCustomers(inputCard: PartialCreditCard): PublicCustomer[] {
    const matchingCustomers: PublicCustomer[] = [];

    _customers.forEach((customer) => {
        const { creditCard } = customer;

        if (_creditCardisMatching(inputCard, creditCard)) {
            const publicCustomer: PublicCustomer = {
                email: customer.email,
                firstName: customer.firstName,
            };

            const isDuplicate = matchingCustomers.some((existingCustomer) =>
                _arePublicCustomersEqual(existingCustomer, publicCustomer)
            );

            if (!isDuplicate) {
                matchingCustomers.push(publicCustomer);
            }
        }
    });

    return matchingCustomers;
}

function _arePublicCustomersEqual(customer1: PublicCustomer, customer2: PublicCustomer): boolean {
    return (
        customer1.email === customer2.email &&
        customer1.firstName === customer2.firstName
    );
}


function _creditCardisMatching(inputCard: PartialCreditCard, savedCard: PartialCreditCard): boolean {
    const card1Keys = Object.keys(inputCard);

    for (const key of card1Keys) {
        if (savedCard[key] !== undefined) {
            if (inputCard[key] !== savedCard[key]) {
                return false;
            }
        }
    }

    return true;
}

function linkCustomer(customer: Customer): void {
    const isDuplicate = _customers.some((existingCustomer: Customer) =>
        _isCustomerMatch(existingCustomer, customer)
    );

    if (!isDuplicate) {
        _customers.push(customer);
    }
}

function _isCustomerMatch(existingCustomer: Customer, newCustomer: Customer): boolean {
    return (
        existingCustomer.email === newCustomer.email &&
        existingCustomer.firstName === newCustomer.firstName &&
        _isCreditCardMatch(existingCustomer.creditCard, newCustomer.creditCard)
    );
}

function _isCreditCardMatch(existingCard: PartialCreditCard, newCard: PartialCreditCard): boolean {
    return (
        existingCard.trailingDigits === newCard.trailingDigits &&
        existingCard.leadingDigits === newCard.leadingDigits &&
        existingCard.cardType === newCard.cardType &&
        existingCard.startDate === newCard.startDate &&
        existingCard.expiryDate === newCard.expiryDate
    );
}

export { findMatchingCustomers, linkCustomer };
