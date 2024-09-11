interface gameuser {
  xp: number;
  lvl: number;
  hp: number;
  kp: number;
  wp: number;
  rank: string;
  nextXP: number;
  lastXP: number;
}

class Gamify {
  xp = 0;
  lvl = 1;
  hp = 0;
  kp = 0;
  wp = 0;
  nextXP = 0;
  lastXP = 0;
  rank = "Recruit";

  rankArray = [
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

  constructor(user: gameuser) {
    this.xp = user.xp;
    this.lvl = user.lvl;
    this.hp = user.hp;
    this.kp = user.kp;
    this.wp = user.wp;
    this.rank = this.rankArray[user.lvl];
    this.nextXP = this.calculateNextXP();
    this.lastXP = 0;
  }

  calculateNextXP() {
    return this.lvl * 100 * 1.25;
  }

  promoteRank() {
    this.rank = this.rankArray[this.lvl];
  }

  increaseLevel() {
    this.lastXP = this.xp;
    this.xp = 0;
    return (this.lvl += 1);
  }

  checkUpgrades() {
    if (this.xp >= this.nextXP) {
      this.increaseLevel();
      this.promoteRank();
      this.nextXP = this.calculateNextXP();
    } else if (this.xp < this.lastXP) {
      this.decreaseLevel();
      this.demoteRank();
      this.nextXP = this.calculateNextXP();
    }
  }

  increaseHP() {
    return (this.hp += 1);
  }
  increaseKP() {
    return (this.kp += 1);
  }
  increaseWP() {
    return (this.wp += 1);
  }

  demoteRank() {
    return (this.lvl -= 1);
  }

  decreaseLevel() {
    return (this.lvl -= 1);
  }

  //   checkDowngrades() {
  //     this.xp -= 1;
  //     if (this.xp <= this.lastXP) {
  //       this.decreaseLevel();
  //       this.demoteRank();
  //       this.nextXP = this.calculateNextXP();
  //     }
  //   }
  decreaseHP() {
    return (this.hp -= 1);
  }
  decreaseKP() {
    return (this.kp -= 1);
  }
  decreaseWP() {
    return (this.wp -= 1);
  }
}

export default Gamify;
