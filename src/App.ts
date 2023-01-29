import CarsPage from './pages/CarsPage';
import WinnersPage from './pages/WinnersPage';
import MainPageView from './pages/MainPageView';
import { selectCar, updateCar, createCar, deleteCar, startEngine, stopEngine, driveCar, moveCar } from './main/actions';
import generateCars from './main/generateCars';
let test: number;
let pageGarage: number = 1;
let pageWinners: number = 1;
let countOfCars: number;
let countOfWinners: number;

export default class App {
    static containerOfGarage: HTMLElement;
    static containerOfWinners: HTMLElement;
    static indexOfCar: number;
    static app: App;

    static async renderNewPage(hash: string) {
        if (hash === 'garage') {
            App.containerOfGarage.classList.remove('hide');
            App.containerOfWinners.classList.add('hide');
            // App.containerOfGarage.innerHTML = '';
            // App.containerOfGarage.append(await new CarsPage().render());
        } else if (hash === 'winners') {
            App.containerOfGarage.classList.add('hide');
            App.containerOfWinners.classList.remove('hide');
            App.containerOfWinners.innerHTML = '';
            App.containerOfWinners.append(await new WinnersPage().render(pageWinners));
            countOfWinners = Number(document.querySelector('.counWinners').innerHTML.slice(9).slice(0, -1));
        } else {
            App.containerOfGarage.classList.add('hide');
            App.containerOfWinners.classList.add('hide');
        }
    }

    private routeChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
    }
    async run() {
        new MainPageView().render();
        const cars = new CarsPage().render();
        const winners = new WinnersPage().render();
        App.containerOfGarage = document.querySelector('.containerOfGarage');
        App.containerOfWinners = document.querySelector('.containerOfWinners');
        App.containerOfWinners.classList.add('hide');
        App.containerOfWinners.append(await winners);
        App.containerOfGarage.append(await cars);
        window.location.hash = 'garage';
        this.routeChange();
        this.eventsListener();
        countOfCars = Number(document.querySelector('.counCars').innerHTML.slice(8).slice(0, -1));
    }
    private eventsListener() {
        document.body.addEventListener('click', async (event) => {
            let target = event.target as HTMLElement;
            console.log(event.target);

            if (target.classList.contains('select')) {
                App.indexOfCar = Number(target.classList[0].slice(6));
                console.log(target.classList[0].slice(6));
                (document.querySelector('.update') as HTMLButtonElement).disabled = false;
                selectCar(App.indexOfCar);
            }
            if (target.classList.contains('update')) {
                await updateCar(App.indexOfCar);
                App.containerOfGarage.innerHTML = '';
                App.containerOfGarage.append(await new CarsPage().render(pageGarage));
            }
            if (target.classList.contains('create-btn')) {
                const nameCar = (document.querySelector('#create') as HTMLInputElement).value;
                console.log(nameCar);

                const chooseColor = (document.querySelector('#createColor') as HTMLInputElement).value;
                await createCar({
                    name: nameCar,
                    color: chooseColor,
                });

                App.containerOfGarage.innerHTML = '';
                App.containerOfGarage.append(await new CarsPage().render());
            }
            if (target.classList.contains('delete')) {
                const indexOfCar = Number((event.target as HTMLElement).classList[0].slice(6));
                deleteCar(indexOfCar);
                App.containerOfGarage.innerHTML = '';
                App.containerOfGarage.append(await new CarsPage().render(pageGarage));
            }
            if (target.classList.contains('start')) {
                const indexOfCar = Number(target.classList[0].slice(5));
                let duration = await startEngine(indexOfCar);
                let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
                test = moveCar(svg, duration, indexOfCar);
                await driveCar(indexOfCar);
            }
            if (target.classList.contains('stop')) {
                const indexOfCar = Number(target.classList[0].slice(4));
                let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
                cancelAnimationFrame(test);
                stopEngine(indexOfCar);
                svg.style.transform = `translateX(${0}px)`;
            }
            if (document.querySelector('.popup')) {
                if (!target.classList.contains('popup')) {
                    document.querySelector('.popup').classList.add('hide');
                }
            }
            if (target.classList.contains('start-race')) {
                const cars = document.querySelectorAll('.icon');

                cars.forEach(async (car) => {
                    let indexOfCar = Number(car.classList[0].slice(4));
                    let duration = await startEngine(indexOfCar);

                    let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
                    test = moveCar(svg, duration, indexOfCar);
                    driveCar(indexOfCar);
                });
            }
            if (target.classList.contains('stop-race')) {
                const cars = document.querySelectorAll('.icon');

                cars.forEach(async (car) => {
                    let indexOfCar = Number(car.classList[0].slice(4));
                    stopEngine(indexOfCar);
                });
            }
            if (target.classList.contains('generate')) {
                await generateCars();
                App.containerOfGarage.innerHTML = '';
                App.containerOfGarage.append(await new CarsPage().render());
                countOfCars = Number(document.querySelector('.counCars').innerHTML.slice(8).slice(0, -1));
                console.log(document.querySelector('.counCars').innerHTML.slice(8).slice(0, -1), 'countOfCars');
            }
            if (target.classList.contains('next-btn')) {
              console.log(countOfCars,'countOfCars');

                if (pageGarage === Math.ceil(countOfCars / 7)) {
                    return;
                } else {
                    App.containerOfGarage.innerHTML = '';
                    App.containerOfGarage.append(await new CarsPage().render(++pageGarage));
                }
            }
            if (target.classList.contains('prev-btn')) {
                if (pageGarage === 1) {
                    return;
                } else {
                    App.containerOfGarage.innerHTML = '';
                    App.containerOfGarage.append(await new CarsPage().render(--pageGarage));
                }
            }
            if (target.classList.contains('next-winners-btn')) {
              console.log(pageWinners,'pageWinners',Math.ceil(countOfWinners / 7),'Math.round(countOfWinners / 7)');

                if (pageWinners === Math.ceil(countOfWinners / 7)) {
                    return;
                } else {
                    App.containerOfWinners.innerHTML = '';
                    App.containerOfWinners.append(await new WinnersPage().render(++pageWinners));
                }
            }
            if (target.classList.contains('prev-winners-btn')) {
                if (pageWinners === 1) {
                    return;
                } else {
                    App.containerOfWinners.innerHTML = '';
                    App.containerOfWinners.append(await new WinnersPage().render(--pageWinners));
                }
            }
        });
    }
}
