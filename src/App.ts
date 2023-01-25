import CarsPage from './pages/CarsPage';
import MainPageView from './pages/MainPageView';
import {selectCar, updateCar, createCar, deleteCar, startEngine, stopEngine, driveCar, animateSVG} from './main/actions'

interface IResult {
  success?: boolean;
}
let test:number;

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
      let target = event.target as HTMLElement;
      console.log(event.target);

      if (target.classList.contains('select')) {
        App.indexOfCar = Number(target.classList[0].slice(6))
        console.log(target.classList[0].slice(6));
        (document.querySelector('.update') as HTMLButtonElement).disabled = false;
        selectCar(App.indexOfCar)
      }
      if (target.classList.contains('update')) {
        // document.querySelector('.container')
        updateCar(App.indexOfCar)
      }
      if (target.classList.contains('create-btn')) {
        const nameCar = (document.querySelector('#create') as HTMLInputElement).value;
        console.log(nameCar);

        const chooseColor = (document.querySelector('#createColor') as HTMLInputElement).value;
        await createCar({
          name: nameCar,
          color: chooseColor,
        });
      }
      if (target.classList.contains('delete')) {
        const indexOfCar = Number((event.target as HTMLElement).classList[0].slice(6));
        deleteCar(indexOfCar);
      }
      if (target.classList.contains('start')) {
        const indexOfCar = Number(target.classList[0].slice(5));
        let duration = startEngine(indexOfCar);
        console.log(await duration);
        let result: IResult = await driveCar(await duration,indexOfCar);
        // let road = document.querySelector('.road') as HTMLDivElement;
        let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
        console.log(svg.getBoundingClientRect().left);


        test = moveCar(svg, await duration, indexOfCar);
        console.log(test);

        // let test = animateSVG(svg, await duration);


        if(!result.success){
          stopEngine(indexOfCar);
          cancelAnimationFrame(test);
          clearInterval(test);
          svg.style.transform = `translateX(${0}px)`;
        }


      }
      if (target.classList.contains('stop')) {
        const indexOfCar = Number(target.classList[0].slice(4));
        let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
        cancelAnimationFrame(test);


        stopEngine(indexOfCar);
        svg.style.transform = `translateX(${0}px)`;
        // clearInterval(test);

      }

      if (target.classList.contains('start-race')) {
        const cars = document.querySelectorAll('.icon');

        cars.forEach(async (car) => {
          let indexOfCar= Number(car.classList[0].slice(4))
          let duration = startEngine(indexOfCar);



        let result: IResult = await driveCar(await duration,indexOfCar);
        // let road = document.querySelector('.road') as HTMLDivElement;
        let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
        console.log(svg.getBoundingClientRect().left);


        test = moveCar(svg, await duration, indexOfCar);

        if(!result.success){
          stopEngine(indexOfCar);
          cancelAnimationFrame(test);
          clearInterval(test);
          svg.style.transform = `translateX(${0}px)`;
        }
        })
        // Promise.all()

      }

    })
  }
}

function animateElement(element: HTMLElement, animationType:string, duration:number) {
  element.style.animation = `${animationType} ${duration}s`;
  }

  function moveCar(svg: HTMLElement, duration:number,indexOfCar:number) {
    let road = document.querySelector('.road') as HTMLDivElement;
    let endX =road.getBoundingClientRect().width;
    let currentX:number;
    // let timer = setTimeout(() => {
    // currentX = svg.getBoundingClientRect().left;
    // console.log('currentX', currentX);
    // }, duration);
    // console.log('currentX', currentX);
    currentX = svg.getBoundingClientRect().left;
    const framesCount = (duration / 1000) * 60;
    const dX = (endX - svg.getBoundingClientRect().left) / framesCount;
    let test:number;
    const tick = () => {
      currentX += dX;

      svg.style.transform = `translateX(${currentX}px)`;

      if (currentX+100 < endX) {
        test = requestAnimationFrame(tick);
      }
      document.querySelector(`.stop${indexOfCar}`).addEventListener('click', async () => {
        // this.stopCar();
        svg.style.transform = `translateX(${0}px)`;
        cancelAnimationFrame(test);
        // clearTimeout(timer);
      });
    };
    tick();
    return test;
  }
