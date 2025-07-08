class Gamify {
    constructor(user) {
        this.xp = 0;
        // total xp is the xp of the user since the beginning
        this.totalXp = 0;
        this.lvl = 1;
        this.hp = 0;
        this.kp = 0;
        this.wp = 0;
        this.nextXp = 15;
        this.lastXp = 0;
        this.ranked = "Recruit";
        this.rankArray = [
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
        this.xp = user.xp;
        this.totalXp = user.totalXp;
        this.lvl = user.lvl;
        this.hp = user.hp;
        this.kp = user.kp;
        this.wp = user.wp;
        this.ranked = user.ranked;
        this.nextXp = user.nextXp;
        this.lastXp = user.lastXp;
    }
    updateNextXp() {
        this.nextXp = Math.floor(10 * Math.pow(this.lvl, 1.5) + this.lvl * 5);
        // 1	15
        // 2	28
        // 3	46
        // 4	69
        // 5	97
    }
    updateRank() {
        this.ranked = this.rankArray[this.lvl] || this.ranked;
    }
    increaseLevel() {
        ++this.lvl;
    }
    checkUpgrades() {
        if (this.xp >= this.nextXp) {
            this.lastXp = this.xp;
            this.updateNextXp();
            this.updateRank();
            this.increaseLevel();
            this.xp = 1;
        }
        if (this.lvl === 1 && this.xp <= 0) {
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
    increaseXp() {
        this.xp++;
    }
    increaseTotalXp() {
        this.totalXp++;
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
    decreaseXp() {
        this.xp = Math.max(this.xp - 1, 0);
    }
    decreaseTotalXp() {
        this.totalXp = Math.max(this.totalXp - 1, 0);
    }
}
export default Gamify;
