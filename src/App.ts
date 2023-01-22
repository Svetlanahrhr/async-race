import CarsPage from './pages/CarsPage';
import MainPageView from './pages/MainPageView';
import {selectCar, updateCar} from './main/actions'

export default class App {
  static container: HTMLElement;
  static indexOfCar: number;

  static async renderNewPage(hash:string){
    if (hash === 'garage') {
      App.container.innerHTML = ''
      App.container.append(await new CarsPage().render())
    } else if (hash === 'winners') {
      App.container.innerHTML = 'winners page'
    } else {
    App.container.innerHTML = 'Page not found'
    }
  }

  private routeChange() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        App.renderNewPage(hash);
    });
}
  async run(){
    new MainPageView().render();
    const cars = new CarsPage().render();
    App.container = document.querySelector('.container')
    App.container.append(await cars)
    this.routeChange();
    this.eventsListener();
  }
  private eventsListener() {
    document.body.addEventListener('click', async (event) => {
      console.log(event.target);

      if ((event.target as HTMLElement).classList.contains('select')) {
        App.indexOfCar = Number((event.target as HTMLElement).classList[0].slice(6))
        console.log((event.target as HTMLElement).classList[0].slice(6));
        (document.querySelector('.update') as HTMLButtonElement).disabled = false;
        selectCar(App.indexOfCar)
      }
      if ((event.target as HTMLElement).classList.contains('update')) {
        document.querySelector('.container')
        updateCar(App.indexOfCar)
      }

    })
  }
}
