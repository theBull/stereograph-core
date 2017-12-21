import { Set } from '../collections';

export class CallbackSet extends Set<Function> {
  constructor() {
    super();
  }
}