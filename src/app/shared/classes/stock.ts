export default class Stock {
  quantity: number;
  woodTypeId: number;
  priceTotal?: number;
  weightTotal?: number;

  constructor(props) {
    this.quantity = props.quantity
    this.woodTypeId = props.woodTypeId
  }
}