export default class CarsPage {
  static container: HTMLElement = document.createElement('div') as HTMLElement;

  render(){
    const header = document.createElement('h1')
    header.innerHTML = 'Cars Page'
    CarsPage.container.append(header);
    return CarsPage.container;
  }
}
