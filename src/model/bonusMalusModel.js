class BonusMalusModel {
  constructor(info) {
    this.on = false;
    this.coeff = info.coeff;
    this.chosenSort = info.chosenSort;
    this.layout = {
      top: Math.random() * 40 + 300,
      left: Math.random() * (window.innerWidth - 200),
      width: 70,
      height: 70,
    };
    this.fallSpeed = 100;
    this.opacity = 1;
    this.nameVisible = false;
  }

    appear = () => {
      this.on = true;

      const bonusIntervall = setInterval(() => {
        if (this.layout.top < window.innerHeight - this.layout.width - this.fallSpeed) {
          this.layout.top = this.layout.top + this.fallSpeed;
        } else {
          this.opacity = this.opacity - 0.2;
        }
        if (this.opacity <= 0) {
          this.on = false;
          clearInterval(bonusIntervall);
        }
      }, 1000);
    }

    destroy = () => {
      this.on = false;
      this.opacity = 0;
      this.layout.top = 0;
      this.layout.left = 0;
      this.nameVisible = true;
    }
}

export default BonusMalusModel;
