export class InputDataContainer {
  public Costs: number = 0;
  public PaymentDue: number =0; //naleność
  public PaymentAwarded: number=0;
  public InterestDue: number=0; //odsetki
  public InterestAwarded: number=0;
  public Installment: number; //rata
  public InstallmentsCount: number=24;
}


export class DataGridRow {
  public Number: number;
  public Date;
  public Installment;
  public Costs;
  public Payment;
  public Interest;
}


export class InputDataContainerV2{
public Glowna: number = 0;
public OdsetkiObjete: number= 0;
public KosztySadowe: number= 0;
public KosztyKlauzuli: number= 0;
public KosztyAdwokackie: number= 0;
public KosztyEgzekucyjne: number= 0;
public Odsetki: number= 0;
public Rata: number = 0; //rata
public IloscRat: number=24;
}