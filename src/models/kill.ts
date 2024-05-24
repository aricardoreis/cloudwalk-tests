import { DeathCauseName } from "./death_cause";

export interface IKill {
  killer: string;
  victim: string;
  cause: DeathCauseName;
}

export default class Kill implements IKill {
  killer: string;
  victim: string;
  cause: DeathCauseName;
  constructor(killer: string, victim: string, cause: DeathCauseName) {
    this.killer = killer;
    this.victim = victim;
    this.cause = cause;
  }
}
