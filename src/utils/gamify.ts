interface GameUser {
  totalXp: number;
  nextXp: number;
  lastXp: number;
  ranked: string;
  xp: number;
  lvl: number;
  hp: number;
  kp: number;
  wp: number;
}

class Gamify {
  xp = 0;
  // total xp is the xp of the user since the beginning
  totalXP = 0;
  lvl = 1;
  hp = 0;
  kp = 0;
  wp = 0;
  nextXP = 0;
  lastXP = 0;
  rank = "Recruit";

  rankArray = [
    "",
    "Recruit",
    "Earthling",
    "Soldier",
    "Elite Soldier",
    "Captain",
    "Lieutenant",
    "Knight",
    "E-rank Hunter",
    "D-rank Hunter",
    "C-rank Hunter",
    "B-rank Hunter",
    "A-rank Hunter",
    "S-rank Hunter",
    "Jōnin",
    "Kage",
    "Z-Fighter",
    "Hokage",
    "Saiyan",
    "Super Saiyan",
  ];

  constructor(user: GameUser) {
    this.xp = user.xp;
    this.totalXP = user.totalXp;
    this.lvl = user.lvl;
    this.hp = user.hp;
    this.kp = user.kp;
    this.wp = user.wp;
    this.rank = user.ranked;
    this.nextXP = user.nextXp;
    this.lastXP = user.lastXp;
  }

  updateNextXP() {
    this.nextXP = this.lvl * 100 * 1.25;
  }

  updateRank() {
    this.rank = this.rankArray[this.lvl] || this.rank;
  }

  increaseLevel() {
    ++this.lvl;
  }

  checkUpgrades() {
    if (this.xp >= this.nextXP) {
      this.xp = 1;
      this.lastXP = this.nextXP;
      this.increaseLevel();
      this.updateRank();
      this.updateNextXP();
    } else if (this.xp === 0) {
      this.xp = Math.max(this.lastXP - 1, 0);
      this.decreaseLevel();
      this.updateRank();
      this.updateNextXP();
      this.lastXP = Math.max(this.lvl * 2 - 2, 0);
    }
  }

  increaseHP() {
    this.hp++;
  }
  increaseKP() {
    this.kp++;
  }
  increaseWP() {
    this.wp++;
  }

  increaseXP() {
    this.xp++;
  }

  increaseTotalXP() {
    this.totalXP++;
  }

  decreaseHP() {
    this.hp = Math.max(this.hp - 1, 0);
  }
  decreaseKP() {
    this.kp = Math.max(this.kp - 1, 0);
  }
  decreaseWP() {
    this.wp = Math.max(this.wp - 1, 0);
  }

  decreaseLevel() {
    this.lvl = Math.max(this.lvl - 1, 1);
  }

  decreaseXP() {
    this.xp = Math.max(this.xp - 1, 0);
  }

  decreaseTotalXP() {
    this.totalXP = Math.max(this.totalXP - 1, 0);
  }

  // checkYesterdaysTasks() {
  //   // check if the user completed all tasks from yesterday
  // }
}

export default Gamify;
