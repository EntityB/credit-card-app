interface PartialCreditCard {
    trailingDigits: string;
    leadingDigits?: string;
    cardType?: string;
    startDate?: string;
    expiryDate?: string;
}

interface Customer {
    email: string;
    firstName: string;
    creditCard: PartialCreditCard;
}

interface PublicCustomer {
    email: string;
    firstName: string;
}

export { PartialCreditCard, Customer, PublicCustomer };
