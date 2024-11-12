export class coupon {

    couponId: string;
    discountType: string;
    expirationType :string;
    minAmountToAvail: number;

    status ?: string;
    discountPercent ?: number;
    discountValue ?: number;
    expirationDate ?: Date;
    maximumAllowedUsages ?: number;
    currentUsages ?: number;

    constructor(couponId: string, minAmountToAvail: number, discountType : string, expirationType : string) {
        this.couponId = couponId;
        this.minAmountToAvail = minAmountToAvail;
        this.discountType = discountType; 
        this.expirationType = expirationType;
    }

}