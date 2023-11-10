class EventPeriodChecker {
  #eventStartDate;

  #eventEndDate;

  constructor(eventStartDate, eventEndDate) {
    this.#eventStartDate = eventStartDate;
    this.#eventEndDate = eventEndDate;
  }

  static of(eventStartDate, eventEndDate) {
    return new EventPeriodChecker(eventStartDate, eventEndDate);
  }

  isEventPeriod(checkDate) {
    return checkDate >= this.#eventStartDate && checkDate <= this.#eventEndDate;
  }
}

export default EventPeriodChecker;
