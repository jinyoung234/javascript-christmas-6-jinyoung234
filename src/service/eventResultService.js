import AmountCalculator from '../domain/AmountCalculator.js';

const eventResultService = {
  createEventResult({ visitDate, menuInfo }) {
    const amountCalculator = new AmountCalculator(menuInfo);
    const beforeDiscountOrderAmount = amountCalculator.calculateAmount();
    console.log(beforeDiscountOrderAmount);
  },
};

export default eventResultService;
