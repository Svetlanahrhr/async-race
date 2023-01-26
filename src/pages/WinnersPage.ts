import CreateElement from '../helpers/CreateElement';
import Winners from '../main/Winners';
export default class WinnersPage {
  private pageNumber: number = 1;
  async render(){
    const wrapper = new CreateElement('div', '', 'wrapper').getElement();

    const {counWinners} = await new Winners(wrapper).getWinners(this.pageNumber);

    const h2= new CreateElement('h2', `Winners (${counWinners})`, 'title').getElement();
    const h3 = new CreateElement('h3', `Page number #${this.pageNumber}`, 'title').getElement();
    wrapper.prepend(h3)
    wrapper.prepend(h2)
    return wrapper;
  }
}
