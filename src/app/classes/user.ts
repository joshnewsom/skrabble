export class User {
  public id: string;
  public username: string;

  constructor(tokenData: { username: string, _id: string }) {
    this.username = tokenData.username;
    this.id = tokenData._id;
  }
}
