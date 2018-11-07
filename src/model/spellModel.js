class SpellModel {
  constructor(info) {
    this.layout = {
      left: 0,
      top: 0,
      height: 10,
      width: 10,
    };
    this.id = `spell${info.id}`;
    this.direction = info.layout.facesRight ? 1 : -1;
    this.color = info.house.color;
    this.isVisible = false;

    this.spellInterval = null;
  }

    animate = (fighter) => {
      this.isVisible = true;

      const x = fighter.layout.facesRight ? 260 : -30;

      this.layout.left = fighter.layout.left + x;
      this.layout.top = fighter.layout.top + 60;

      this.spellIntervall = setInterval(() => {
        this.layout.left = this.layout.left + 10 * x / Math.abs(x);
      }, 10);
    }

    destroy=() => {
      clearInterval(this.spellIntervall);

      this.isVisible = false;
      this.layout.top = 0;
      this.layout.left = 0;
    }
}

export default SpellModel;
