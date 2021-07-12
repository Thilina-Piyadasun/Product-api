/**
 * Response structure send to the todo web application
 */
export class ProductResponse {
  constructor(
    private _status: string,
    private _data: any[],
    private _message: string
  ) { }

  set status(value: string) {
    this._status = value;
  }

  set data(value: any[]) {
    this._data = value;
  }

  set message(value: string) {
    this._message = value;
  }
}
