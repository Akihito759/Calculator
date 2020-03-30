export class interestRateCollection {
  private collection: InterestRateModel[] = this.generateCollection();

  public calculatePayment(
    baseValue: number,
    startingDate: Date,
    endingDate: Date,
    useOptional = false
  ) {
    let payment = 0;
    startingDate.setDate(startingDate.getDate() + 1); //start counting from next day 
    let filterdCollection = this.collection.filter(
      x => x.dateTo >= startingDate && x.dateFrom <= endingDate && x.isOptional == useOptional
    );
    filterdCollection.forEach(x => {
      let sectionBeginingDate =
        x.dateFrom < startingDate ? startingDate : x.dateFrom;
      let sectionEndingDate = x.dateTo > endingDate ? endingDate : x.dateTo;
      let days = this.daysBetweenDates(sectionBeginingDate, sectionEndingDate)+1; //fuking noob calcualting
      payment += Number(((days / 365) * x.value * baseValue).toFixed(2));
    /*  console.log(
        `${sectionBeginingDate.toLocaleDateString()} ${sectionEndingDate.toLocaleDateString()} ${days} ${
          x.value
        } ${payment}`
      );*/
    });
    return payment;
  }

  private getInterestRates() {
    return [
      { date: "15.08.1992", value: 60 },
      { date: "01.05.1993", value: 54 },
      { date: "15.12.1995", value: 46 },
      { date: "01.01.1997", value: 35 },
      { date: "15.04.1998", value: 33 },
      { date: "01.02.1999", value: 24 },
      { date: "15.05.1999", value: 21 },
      { date: "01.11.2000", value: 30 },
      { date: "15.12.2001", value: 20 },
      { date: "25.07.2002", value: 16 },
      { date: "01.02.2003", value: 13 },
      { date: "25.09.2003", value: 12.25 },
      { date: "10.01.2005", value: 13.5 },
      { date: "15.10.2005", value: 11.5 },
      { date: "15.12.2008", value: 13 },
      { date: "23.12.2014", value: 8 },
      { date: "01.01.2016", value: 7, optional: false },
      { date: "01.01.2020", value: 11, optional: true }
    ];
  }

  private daysBetweenDates(date1: Date, date2: Date): number {
    return Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  }

  private generateCollection() {
    let inputInterest = this.getInterestRates();
    let interestRateCollection = [];
    for (let i = 0; i < inputInterest.length; ++i) {
      ///console.log(this.getDateFromString(inputInterest[i].date).toLocaleDateString("de-DE"));
      if (inputInterest[i].optional != null) {
        interestRateCollection.push(
          new InterestRateModel(
            inputInterest[i].date,
            null,
            inputInterest[i].value,
            inputInterest[i].optional
          )
        );
      } else if (i + 1 < inputInterest.length) {
        interestRateCollection.push(
          new InterestRateModel(
            inputInterest[i].date,
            inputInterest[i + 1].date,
            inputInterest[i].value,
            inputInterest[i].optional
          )
        );
      }
    }
    return interestRateCollection;
  }
}

export class InterestRateModel {
  dateFrom: Date;
  dateTo: Date;
  value: number;
  isOptional: boolean;

  constructor(
    dateFrom: string,
    dateTo: string,
    value: number,
    optional: boolean
  ) {
    this.dateFrom = this.getDateFromString(dateFrom);
    let tempDateTo =
      dateTo != null ? this.getDateFromString(dateTo) : new Date(2099, 10, 1);
    this.dateTo = new Date(
      tempDateTo.getFullYear(),
      tempDateTo.getMonth(),
      tempDateTo.getDate() - 1
    );
    this.value = value / 100;
    this.isOptional = optional != null ? optional : false;
  }

  private getDateFromString(input: string) {
    let numbers = (input.split(".") as unknown) as number[];
    // months starts from 0
    return new Date(numbers[2], numbers[1] - 1, numbers[0]);
  }
}
