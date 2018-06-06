import Order from "./order";

export default class BuyingOrder extends Order {
  providerId: number;

  constructor(props) {
    super(props);

    this.providerId = props.providerId;
  }
}