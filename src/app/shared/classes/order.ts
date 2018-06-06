export default abstract class Order {
  dateCreation: Date;
  quantity: number;
  priceTotal: number;
  weightTotal: number;
  woodTypeId: number;

  constructor(props) {
    this.quantity = props.quantity;
    this.woodTypeId = props.woodTypeId;
  }
}