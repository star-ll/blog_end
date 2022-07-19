export function ResponseJSON(
  data: any = null,
  message: string = '',
  statusCode: number = 200,
) {
  this.data = data;
  this.message = message;
  this.statusCode = statusCode;
}
