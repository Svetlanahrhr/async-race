import CreateElement from '../helpers/CreateElement';
import CreateSVG from '../helpers/CreateSVG';
import Model from '../model';

interface ICar {
    color: string;
    id: number;
    name: string;
}

export default class Cars {
    click = false;

    constructor(public wrapper: HTMLElement) {
        this.wrapper = wrapper;
    }

    async renderCar(color: string, id: number, name: string) {
        const svg = new CreateSVG().getSVG(color, id);
        const road = new CreateElement('div', '', 'road').getElement();
        const div = new CreateElement('div', '', 'div').getElement();
        const h3 = new CreateElement('h3', `${name}`, `name${id}`).getElement();
        const btnStart = new CreateElement('button', 'Start', [`start${id}`, 'btn-action', 'start']).getElement();
        const btnStop = new CreateElement('button', 'Stop', [`stop${id}`, 'btn-action', 'stop']).getElement();
        const btnSelect = new CreateElement('button', 'Select', [`select${id}`, 'btn-action', 'select']).getElement();
        const btnDelete = new CreateElement('button', 'Delete', [`delete${id}`, 'btn-action', 'delete']).getElement();

        div.append(btnStart);
        div.append(btnStop);
        div.append(btnSelect);
        div.append(btnDelete);
        div.append(h3);
        road.append(div);
        road.append(svg);
        this.wrapper.append(road);
    }

    async getCars(pageNumber = 1) {
        const resp = await fetch(`http://127.0.0.1:3000/garage?_page=${pageNumber}&_limit=7`);
        const cars = await resp.json();

        let counCars = resp.headers.get('X-Total-Count');

        cars.forEach((car: ICar) => {
            console.log(car);
            this.renderCar(car.color, car.id, car.name);
        });

        return { counCars, cars, pageNumber };
    }
}

// function animateSVG(element, duration, from, to) {
//   element.animate([{ transform: from }, { transform: to }], {
//   duration: duration,
//   iterations: 1
//   });
//   }
