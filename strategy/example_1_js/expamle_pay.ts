type Payment = {
  clientId: string;
  amount: number;
};

interface PaymentMetod {
  charge(): Payment;
}

class CreditCardPayment implements PaymentMetod {
  payment: Payment;

  constructor(payment: Payment) {
    this.payment = payment;
  }
  charge(): Payment {
    console.log("Charting with credit card");
    return this.payment;
  }
}
class DebitCardPayment implements PaymentMetod {
  payment: Payment;

  constructor(payment: Payment) {
    this.payment = payment;
  }

  charge(): Payment {
    console.log("Charting with debit card");
    return this.payment;
  }
}

class PaymentStrategy {
  strategy: PaymentMetod;

  constructor(strategy: PaymentMetod) {
    this.strategy = strategy;
  }

  setPayment(strategy: PaymentMetod) {
    this.strategy = strategy;
  }
  charge(): Payment {
    return this.strategy.charge();
  }
}

const creditCardPayment = new CreditCardPayment({
  clientId: "1",
  amount: 10,
});
const debitCardPayment = new DebitCardPayment({
  clientId: "1",
  amount: 20,
});

const paymentStrategy = new PaymentStrategy(creditCardPayment);
paymentStrategy.charge();

paymentStrategy.setPayment(debitCardPayment);
paymentStrategy.charge();
