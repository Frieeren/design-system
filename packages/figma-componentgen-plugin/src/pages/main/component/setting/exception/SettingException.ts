import { BaseException } from "@frieeren/shared/exception/BaseException";

export class SettingException extends BaseException {
  constructor(message: string) {
    super(`Setting Error: ${message}`);
    this.name = "SettingException";
  }
}
