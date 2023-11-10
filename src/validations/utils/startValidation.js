import AppError from '../../errors/appError.js';

export const startValidation = (validationTypes, value) => {
  Object.values(validationTypes).forEach(({ errorMessage, isValid }) => {
    if (!isValid(value)) throw new AppError(errorMessage);
  });
};
