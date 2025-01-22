import { adminModel } from "../model/adminModel";

export class adminServices {
  static login(email: string, password: string) {
    return adminModel.login(email, password);
  }
}
