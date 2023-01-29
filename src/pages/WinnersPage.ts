import CreateElement from '../helpers/CreateElement';
import Winners from '../main/Winners';
export default class WinnersPage {
  // private pageNumber: number = 1;
  async render(pageNumber:number=1){
    const wrapper = new CreateElement('div', '', 'wrapper').getElement();

    const {counWinners} = await new Winners(wrapper).getWinners(pageNumber);

    const h2= new CreateElement('h2', `Winners (${counWinners})`, 'counWinners').getElement();
    const h3 = new CreateElement('h3', `Page number #${pageNumber}`, 'title').getElement();
    wrapper.prepend(h3)
    wrapper.prepend(h2)
    const prevBtn = new CreateElement('button', 'prev', ['prev-winners-btn','btn-action']).getElement();
    const nextBtn = new CreateElement('button', 'next', ['next-winners-btn', 'btn-action']).getElement();

    wrapper.append(prevBtn)
    wrapper.append(nextBtn)
    return wrapper;
  }
}
