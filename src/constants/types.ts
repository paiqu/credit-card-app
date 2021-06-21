export type ICard = {
  number: string,
  expiry: string,
  cvc: string,
  name: string,
  phone: string,
}

export type Severity = "error" | "success" | "info" | "warning" | undefined;
