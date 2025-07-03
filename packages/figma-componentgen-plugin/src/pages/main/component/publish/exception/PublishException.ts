import { BaseException } from "@frieeren/shared/exception/BaseException";

export class PublishException extends BaseException {
  constructor(message: string) {
    super(`Publish Error: ${message}`);
    this.name = "PublishException";
  }
}
