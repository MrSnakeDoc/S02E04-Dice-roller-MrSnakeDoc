const app = document.getElementById("app");
class DiceClass {
  constructor(range, className, parentId) {
    this.range = range;
    this.className = className;
    this.parent = document.getElementById(parentId);
    this.value = Math.round(
      Math.random() * (this.range[0] - this.range[1]) + this.range[1]
    );
    this._element = document.createElement("div");
    this._element.setAttribute("class", this.className);
    this.parent.append(this._element);
    this._element.style.backgroundPosition = `${(this.value - 1) * -100}px 0px`;
  }
}
class PalDiv {
  constructor(id, className, parentId, color, i) {
    this.className = className;
    this.id = id;
    this.parent = document.getElementById(parentId);
    this._element = document.createElement("div");
    this._element.setAttribute("class", this.className);
    this._element.setAttribute("id", this.id);
    this._element.style.backgroundColor = color;
    this._element.style.display = "flex";
    this._element.style.flexDirection = "column";
    this._element.innerHTML = `
    <div class="playerName">
    <h2 style="color:white; font-weight: bold;font-size: 2rem;
        margin-bottom: 2rem;">Player ${i}</h2>
    </div>
    <div id="dices${i}" style="display:flex; flex-wrap:wrap;justify-content:center"></div>`;
    this.parent.append(this._element);
  }
}
class InputText {
  constructor(id, parentId, question) {
    this.id = id;
    this.parent = document.getElementById(parentId);
    this._element = document.createElement("form");
    this._element.setAttribute("id", this.id);
    this._element.style.minHeight = "100vh";
    this._element.style.width = "100%";
    this._element.style.display = "flex";
    this._element.style.flexDirection = "column";
    this._element.style.alignItems = "center";
    this._element.style.justifyContent = "center";
    this._element.style.alignContent = "center";
    this._element.innerHTML = `
        <label for="playerInput" style="color:white; font-weight: bold;font-size: 2rem;
        margin-bottom: 2rem;">${question}</label>
        <input name= "playerInput" id="playerInput" type="number" value="2" style="margin-bottom: 2rem;" />
        <button type="submit" id="button">OK</button>`;
    this.parent.append(this._element);
  }
}
(() => {
  const nbPlayerDiv = new InputText("form", "app", "Nombre de joueurs ?");
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const nb = +document.getElementById("playerInput").value;
    console.log(nb);
    app.innerText = "";
    const nbdiceDiv = new InputText("form", "app", "Nombre de dés en jeu ?");
    document
      .getElementById("form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let input = document.getElementById("playerInput");
        let nbDice = parseInt(input.value, 10);
        app.innerText = "";
        for (let i = 0; i < nb; i++) {
          let color;
          if (i % 2 === 1) {
            color = "#e67e22";
          }
          const pal = new PalDiv(`player${i}`, "board", "app", color, i);
          setTimeout(() => {
            for (var j = 0; j < nbDice; j++) {
              setTimeout(() => {
                dice = new DiceClass([1, 6], "dice", `dices${i}`);
              }, j * 1000);
            }
          }, 1000);
        }
      });
  });
})();
