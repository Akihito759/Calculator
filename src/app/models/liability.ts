export class LiabilityCollection{
    collection: Liability[]=[];
    
    createCollection(liabilities: number[]){
        liabilities.forEach(x => {
            this.collection.push(new Liability("mama",x));
        });
    }

    calculateLiability(installment: number){
        let tempinstallment = installment;
        this.collection.forEach(x => {
            tempinstallment = x.calculateLiability(tempinstallment);
        });
    }

    getDisplayValues(): string[]{
        var displayValues = [];
        this.collection.forEach(x => displayValues.push(this.formatNumber(x.DisplayValue)));
        return displayValues;
    }

    private formatNumber(number: number, useComma = true, fixedSize = 2){
        return useComma ? number.toFixed(fixedSize).replace(".",",") : number.toFixed(fixedSize);
     }
}

export class Liability {
    public Name: string;
    public InitialValue: number;
    public RemainValue: number;
    public DisplayValue: number;

    constructor(name: string,initValue: number){
        this.Name = name;
        this.InitialValue = initValue;
        this.RemainValue = initValue;
    }

    public calculateLiability(installment: number): number{
        this.DisplayValue = 0;

        if(this.RemainValue - installment >= 0 && installment > 0){
            this.DisplayValue = installment;
            this.RemainValue -= installment;
            return 0;
        } else if(installment > 0) {
            this.DisplayValue = this.RemainValue;
            var restOfInstallment = Math.abs(this.RemainValue - installment);
            this.RemainValue = 0;
            return restOfInstallment;
        }
    }


    
}