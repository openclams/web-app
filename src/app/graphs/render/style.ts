export class Style {

  public printAll() {
    const propertyNames = Object.getOwnPropertyNames(this);
    for (const propertyName of propertyNames) {
      console.log(this[propertyName]);
    }
  }

  public asString(): string {
    const styleString = [];
    for (const [k, v] of Object.entries(this)) {
      styleString.push(`${k}=${v}`);
    }

    return styleString.join(';');
  }
}
