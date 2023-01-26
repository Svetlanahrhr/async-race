import CreateElement from '../helpers/CreateElement';
import CreateSVG from '../helpers/CreateSVG';
import { IWinner } from '../main/actions';

export default class Winners {
  private table = this.renderInitial();
    constructor(public wrapper: HTMLElement) {
        this.wrapper = wrapper;
        this.wrapper.append(this.table)
    }
    renderInitial() {
        const tableD = new CreateElement('table', '', 'table').getElement();
        const tr = new CreateElement('tr', '', 'tr').getElement();
        const thID = new CreateElement('th', 'id', 'tr').getElement();
        const thWins = new CreateElement('th', 'wins', 'tr').getElement();
        const thTimes = new CreateElement('th', 'times', 'tr').getElement();
        tr.append(thID);
        tr.append(thWins);
        tr.append(thTimes);
        tableD.append(tr);
        return tableD;

    }

    async renderWinner(id?: number, time?: number, wins?: number) {
      const tr = new CreateElement('tr', '', 'tr').getElement();
      const thID = new CreateElement('th', `${id}`, 'tr').getElement();
      const thWins = new CreateElement('th', `${wins}`, 'tr').getElement();
      const thTimes = new CreateElement('th', `${time}`, 'tr').getElement();
      tr.append(thID);
      tr.append(thWins);
      tr.append(thTimes);
      this.table.append(tr);
    }

    async getWinners(pageNumber = 1) {
        const resp = await fetch(`http://127.0.0.1:3000/winners?_page=${pageNumber}&_limit=7`);
        const winners = await resp.json();

        let counWinners = resp.headers.get('X-Total-Count');

        winners.forEach((winner: IWinner) => {
            console.log(winner,'winner in winners');
            this.renderWinner(winner.id, winner.time, winner.wins);
        });

        return { counWinners, winners, pageNumber };
    }
}
