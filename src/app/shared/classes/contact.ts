export default abstract class Contact {
  name: string;
  email: string;
  address: string;

  constructor(props) {
    this.name = props.name;
    this.email = props.email;
    this.address = props.address;
  }
}