export default class Stock {
  quantity: number;
  woodTypeId: number;
  priceTotal?: number;
  weightTotal?: number;

  constructor(params) {
    this.quantity = params.quantity
    this.woodTypeId = params.woodTypeId

    console.log(this.quantity)
  }
}