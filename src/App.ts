import CarsPage from './pages/CarsPage';
import WinnersPage from './pages/WinnersPage';
import MainPageView from './pages/MainPageView';
import { selectCar, updateCar, createCar, deleteCar, startEngine, stopEngine, driveCar, moveCar } from './main/actions';

let test: number;

export default class App {
    static containerOfGarage: HTMLElement;
    static containerOfWinners: HTMLElement;
    static indexOfCar: number;
    static app: App;

    static async renderNewPage(hash: string) {
        if (hash === 'garage') {
            App.containerOfGarage.classList.remove('hide');
            App.containerOfWinners.classList.add('hide');
            App.containerOfGarage.innerHTML = '';
            App.containerOfGarage.append(await new CarsPage().render());
        } else if (hash === 'winners') {
            App.containerOfGarage.classList.add('hide');
            App.containerOfWinners.classList.remove('hide');
            App.containerOfWinners.innerHTML = '';
            App.containerOfWinners.append(await new WinnersPage().render());
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
                App.renderNewPage('garage');
            }
            if (target.classList.contains('create-btn')) {
                const nameCar = (document.querySelector('#create') as HTMLInputElement).value;
                console.log(nameCar);

                const chooseColor = (document.querySelector('#createColor') as HTMLInputElement).value;
                await createCar({
                    name: nameCar,
                    color: chooseColor,
                });

                App.renderNewPage('garage');
            }
            if (target.classList.contains('delete')) {
                const indexOfCar = Number((event.target as HTMLElement).classList[0].slice(6));
                deleteCar(indexOfCar);
                App.renderNewPage('garage');
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
        });
    }
}
