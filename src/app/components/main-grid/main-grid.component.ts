import { Component, OnInit } from "@angular/core";
import {
  InputDataContainer,
  DataGridRow,
  InputDataContainerV2
} from "src/app/models/input-data-container";
import { LiabilityCollection } from 'src/app/models/liability';

@Component({
  selector: "main-grid",
  templateUrl: "./main-grid.component.html",
  styleUrls: ["./main-grid.component.less"]
})
export class MainGridComponent implements OnInit {
  public conatiner = new InputDataContainer();
  public containerV2 = new InputDataContainerV2();
  public dataSource: any[] = [];

  constructor() {}

  onClick() {
    //console.log(this.conatiner);
    //this.calculateCredit(this.conatiner);
    this.calculateCreditV2(this.containerV2);
  }
  
  private calculateCreditV2(data: InputDataContainerV2){
    data.IloscRat = this.validateInstallmentsCount(this.totalCost(),data.Rata,data.IloscRat);
    let dates = this.getDates(new Date(),data.IloscRat);
    this.dataSource = [];
    var liabilities = new LiabilityCollection();
    liabilities.createCollection(this.getCostCollection());


    for (var i = 0; i < data.IloscRat; ++i){
      var installment =
      i + 1 < data.IloscRat
        ? data.Rata
        : this.totalCost() - (data.IloscRat - 1) * data.Rata;

        liabilities.calculateLiability(installment);
        this.dataSource.push([dates[i],this.formatNumber(installment)].concat(liabilities.getDisplayValues()));
    }

  }

  private getDates(from: Date, count: number) {
    var dates = [];
    //skip first month
    from.setMonth(from.getMonth() + 1);

    var dateFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };

    for (var i = 0; i < count; ++i) {
      dates.push(
        new Date(
          from.getFullYear(),
          from.getMonth() + 1 + i,
          0
        ).toLocaleDateString("de-DE", dateFormatOptions)
      );
    }
    return dates;
  }

  private validateInstallmentsCount(
    allCost: number,
    installment: number,
    installmentsCount: number
  ) {
    return installment * installmentsCount <= allCost
      ? installmentsCount
      : Math.ceil(allCost / installment);
  }

  private formatNumber(number: number, useComma = true, fixedSize = 2) {
    return useComma
      ? number.toFixed(fixedSize).replace(".", ",")
      : number.toFixed(fixedSize);
  }

  public totalCost() {
    return this.containerV2.Glowna +
    this.containerV2.OdsetkiObjete +
    this.containerV2.KosztySadowe +
    this.containerV2.KosztyKlauzuli +
    this.containerV2.KosztyAdwokackie +
    this.containerV2.KosztyEgzekucyjne +
    this.containerV2.Odsetki;
  }

  private getCostCollection(){
    return [
      this.containerV2.Glowna,
      this.containerV2.OdsetkiObjete,
      this.containerV2.KosztySadowe,
      this.containerV2.KosztyKlauzuli,
      this.containerV2.KosztyAdwokackie,
      this.containerV2.KosztyEgzekucyjne,
      this.containerV2.Odsetki
    ]
  }

  public FormatedTotalCost(){
    return this.formatNumber(this.totalCost());
  }
  ngOnInit(): void {}
}
