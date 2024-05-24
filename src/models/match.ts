import IEntity from "./entity";

export interface IMatchInfo {
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
}

export interface IGroupedMatch extends Record<string, IMatchInfo> {}

export interface IMatch extends IMatchInfo, IEntity {
  addPlayer(player: string): void;
  addKill(player: string, victim: string): void;
}

export default class Match implements IMatch {
  id: string;
  total_kills: number;
  players: string[];
  kills: Record<string, number>;

  constructor(id: string) {
    this.id = id;
    this.total_kills = 0;
    this.players = [];
    this.kills = {};
  }

  // TODO add methods like addPlayer, addKill, etc.

  addPlayer(player: string): void {
    if (!this.players.includes(player)) {
      this.players.push(player);
      this.kills[player] = 0;

      console.log(`New player added: ${player}.`);
    }
  }

  addKill(killer: string, victim: string): void {
    console.log(`${killer} killed ${victim}.`);

    // TODO create a constants file to keep fixed values
    if (!this.players.includes(killer)) {
      if (killer === "<world>") {
        // victim loses a kill when killed by world
        this.kills[victim]--;
      } else {
        this.kills[killer]++;
      }
    }

    this.total_kills++;
  }
}
