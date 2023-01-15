import CreateElement from '../helpers/CreateElement';
export default class MainPageView {
  static container: HTMLElement = document.querySelector('body') as HTMLElement;
    static btnCars = new CreateElement('a', 'To garage', 'btn').getElement() as HTMLLinkElement;
    static btnGarage = new CreateElement('a', 'To winners', 'btn').getElement();
    static header = new CreateElement('h1', 'Async Race', 'btn').getElement();

    render() {
      MainPageView.container.append(MainPageView.header)
      MainPageView.container.append(MainPageView.btnCars)
      MainPageView.container.append(MainPageView.btnGarage)
    }
}
