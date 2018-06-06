import Order from "./order";

export default class PurchaseOrder extends Order {
  clientId: number;

  constructor(props) {
    super(props);

    this.clientId = props.clientId;
  }
}