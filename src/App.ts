import CarsPage from './pages/CarsPage';
import MainPageView from './pages/MainPageView';

export default class App {

  static renderNewPage(hash:string){
    // this.container.innerHTML = '';
  }

  private routeChange() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        App.renderNewPage(hash);
    });
}
  run(){
    new MainPageView().render();
  }
}
