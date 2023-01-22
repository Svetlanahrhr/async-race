import CreateElement from '../helpers/CreateElement';

export default class MainPageView {
  static container: HTMLElement = document.querySelector('body') as HTMLElement;
    static btnCars: HTMLLinkElement = new CreateElement('a', 'To garage', 'btn').getElement() as HTMLLinkElement;
    static btnWinners: HTMLLinkElement = new CreateElement('a', 'To winners', 'btn').getElement() as HTMLLinkElement;
    static header = new CreateElement('h1', 'Async Race', 'header').getElement();
    static containerOfCars = new CreateElement('div', '', 'container').getElement() as HTMLElement;

    async render() {
      MainPageView.container.append(MainPageView.header)
      MainPageView.btnCars.href = '#garage';
      MainPageView.btnWinners.href = '#winners';
      MainPageView.container.append(MainPageView.btnCars)
      MainPageView.container.append(MainPageView.btnWinners)
      MainPageView.container.append(MainPageView.containerOfCars)
    }
}
