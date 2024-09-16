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
    this.rank = user.rank;
    this.nextXP = user.nextXP;
    this.lastXP = user.lastXP;
  }

  calculateNextXP() {
    // return this.lvl * 100 * 1.25;
    return this.lvl * 3 + 2;
  }

  promoteRank() {
    return this.rankArray[this.lvl] || this.rank;
  }

  increaseLevel() {
    return (this.lvl += 1);
  }

  checkUpgrades() {
    if (this.xp >= this.nextXP) {
      this.lvl = this.increaseLevel();
      this.rank = this.promoteRank();
      
      this.lastXP = this.xp;
      this.nextXP = this.calculateNextXP();
      this.xp = 1;
     
    } else if (this.xp === 0) {
      this.decreaseLevel();
      this.xp = Math.max(this.lastXP - 1,0);
      this.nextXP = this.lastXP;
      this.rank = this.promoteRank();
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