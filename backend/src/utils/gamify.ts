interface GameUser {
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
  rank = 'Recruit';

  rankArray = [
    "", 'Recruit', 'Earthling', 'Soldier', 'Elite Soldier', 'Captain',
    'Lieutenant', 'Knight', 'E-rank Hunter', 'D-rank Hunter',
    'C-rank Hunter', 'B-rank Hunter', 'A-rank Hunter', 'S-rank Hunter',
    'Jōnin', 'Kage', 'Z-Fighter', 'Hokage', 'Saiyan', 'Super Saiyan'
  ];

  constructor(user: GameUser) {
    this.xp = user.xp;
    this.lvl = user.lvl;
    this.hp = user.hp;
    this.kp = user.kp;
    this.wp = user.wp;
    this.rank = this.rankArray[this.lvl] || 'Recruit';
    this.nextXP = this.calculateNextXP();
    this.lastXP = 0;
  }

  calculateNextXP() {
    // return this.lvl * 100 * 1.25;
    return this.lvl * 3;
  }

  promoteRank() {
    return this.rankArray[this.lvl] || this.rank;
  }

  increaseLevel() {
    return (this.lvl += 1);
  }

  checkUpgrades() {
    if (this.xp >= this.nextXP) {
      this.lastXP = this.xp;
      this.xp = 0;
      this.lvl = this.increaseLevel();
      this.rank = this.promoteRank();
      this.nextXP = this.calculateNextXP();
    } else if (this.xp < this.lastXP) {
      this.decreaseLevel();
      this.rank = this.promoteRank();
      this.nextXP = this.calculateNextXP();
    }
  }

  increaseHP() {
    return ++this.hp;
  }
  increaseKP() {
    return ++this.kp;
  }
  increaseWP() {
    return ++this.wp;
  }

  increaseXP(){
return ++this.xp;
  }

  decreaseHP() {
    return Math.max(this.hp - 1, 0);
  }
  decreaseKP() {
    return Math.max(this.kp - 1, 0);
  }
  decreaseWP() {
    return Math.max(this.wp - 1, 0);
  }

  decreaseLevel() {
    return Math.max(this.lvl - 1, 1);
  }

  decreaseXP() {
    return Math.max(this.xp - 1, 1);
  }
}

export default Gamify;