import { DeathCauseName } from "./death_cause";
import IEntity from "./entity";
import Kill, { IKill } from "./kill";

export interface IMatchInfo {
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
}

export interface IGroupedMatch extends Record<string, IMatchInfo> {}

export interface IMatch extends IMatchInfo, IEntity {
  kills_details: IKill[];
  addPlayer(player: string): void;
  addKill(player: string, victim: string, deathCause: DeathCauseName): void;
}

export default class Match implements IMatch {
  id: string;
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
  kills_details: IKill[];

  constructor(id: string) {
    this.id = id;
    this.total_kills = 0;
    this.players = [];
    this.kills = {};
    this.kills_details = [];
  }

  addPlayer(player: string): void {
    if (!this.players.includes(player)) {
      this.players.push(player);
      this.kills[player] = 0;
    }
  }

  addKill(killer: string, victim: string, deathCause: DeathCauseName): void {
    this.kills_details.push(new Kill(killer, victim, deathCause));

    // TODO What does it happen when is a self kill?
    // 22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH

    // TODO create a constants file to keep fixed values
    if (killer === "<world>") {
      // victim loses a kill when killed by world
      this.kills[victim]--;
    } else {
      this.kills[killer]++;
    }

    this.total_kills++;
  }
}
