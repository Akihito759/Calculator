import { Component, OnInit } from "@angular/core";
import { interestRateCollection } from "src/app/models/interestRateCollection";

@Component({
  selector: "odsetki",
  templateUrl: "./odsetki.component.html",
  styleUrls: ["./odsetki.component.less"]
})
export class OdsetkiComponent implements OnInit {
  interestCollection = new interestRateCollection();
  beginingDate;
  endingDate;
  basePayment: number;
  displayPayment: string;

  constructor() {}

  public addMonth() {
    console.log(this.beginingDate);
    if (this.beginingDate && this.endingDate) {
      this.beginingDate = new Date(this.beginingDate);
      this.endingDate = new Date(this.endingDate);
      this.beginingDate.setMonth(this.beginingDate.getMonth() + 1);
      this.endingDate.setMonth(this.endingDate.getMonth() + 1);
      this.beginingDate = this.beginingDate.toISOString().slice(0,10);
      this.endingDate = this.endingDate.toISOString().slice(0,10);
      this.calculate();
    }
  }

  public calculate(){
    this.displayPayment = null;
    if(this.basePayment >0 && this.beginingDate && this.endingDate){
      let payment = this.interestCollection.calculatePayment(Number(this.basePayment),new Date(this.beginingDate),new Date(this.endingDate));
      this.displayPayment = payment.toFixed(2);
      this.displayPayment.replace(".",",");
    }
  }

  ngOnInit(): void {
  }
}
