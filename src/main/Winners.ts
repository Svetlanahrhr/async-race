import CreateElement from '../helpers/CreateElement';
import CreateSVG from '../helpers/CreateSVG';
import {IWinner} from '../main/actions'

export default class Winners {
  // click = false;

  constructor(public wrapper: HTMLElement) {
      this.wrapper = wrapper;
  }

  async renderWinner(id?: number, time?: number, wins?: number) {
      // const svg = new CreateSVG().getSVG(color, id);
      // const road = new CreateElement('div', '', 'road').getElement();
      // const div = new CreateElement('div', '', 'div').getElement();
      // const h3 = new CreateElement('h3', `${name}`, `name${id}`).getElement();
      // const btnStart = new CreateElement('button', 'Start', [`start${id}`, 'btn-action', 'start']).getElement();
      // const btnStop = new CreateElement('button', 'Stop', [`stop${id}`, 'btn-action', 'stop']).getElement();
      // const btnSelect = new CreateElement('button', 'Select', [`select${id}`, 'btn-action', 'select']).getElement();
      // const btnDelete = new CreateElement('button', 'Delete', [`delete${id}`, 'btn-action', 'delete']).getElement();

      // div.append(btnStart);
      // div.append(btnStop);
      // div.append(btnSelect);
      // div.append(btnDelete);
      // div.append(h3);
      // road.append(div);
      // road.append(svg);
      // this.wrapper.append(road);
      this.wrapper.innerHTML = `Winnerssss `;
  }

  async getWinners(pageNumber = 1) {
      const resp = await fetch(`http://127.0.0.1:3000/winners?_page=${pageNumber}&_limit=7`);
      const winners = await resp.json();

      let counWinners = resp.headers.get('X-Total-Count');

      winners.forEach((winner: IWinner) => {
          console.log(winner);
          this.renderWinner(winner.id, winner.time, winner.wins);
      });

      return { counWinners, winners, pageNumber };
  }
}
