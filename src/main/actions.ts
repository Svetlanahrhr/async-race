import App from "../App";
import CarsPage from "../pages/CarsPage";
import MainPageView from "../pages/MainPageView";

export  async function selectCar(indexOfCar:number) {
  const resp = await fetch(`http://127.0.0.1:3000/garage/${indexOfCar}`);
  const car = await resp.json();

  (document.querySelector('#update') as HTMLInputElement).value = car.name;
  (document.querySelector('.update-color') as HTMLInputElement).value = car.color;
  document.querySelector(`.name${indexOfCar}`).classList.add('selected');

}

export  async function updateCar(id:number) {
  const resp = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: (document.querySelector('#update')as HTMLInputElement).value,
      color: (document.querySelector('.update-color')as HTMLInputElement).value,
    }),
  });
  await resp.json();
  App.renderNewPage('garage')
  return;
}

export async function createCar (body: object) {
  const resp = await fetch(`http://127.0.0.1:3000/garage`, {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
  })
  App.renderNewPage('garage')
  return;
}

export async function deleteCar (id:number) {
  const resp = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
  })
  App.renderNewPage('garage')
  return;
}
export async function startEngine(indexOfCar:number) {
  const resp = await fetch(
    `http://127.0.0.1:3000/engine?id=${indexOfCar}&status=started`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'started',
      }),
    },
  );
  const r = await resp.json();
  const { velocity, distance } = r;
  const duration = Math.round(distance / velocity);

  return duration;
}

export async function driveCar(duration: number, indexOfCar: number) {
  let resp;
    await fetch(`http://127.0.0.1:3000/engine?id=${indexOfCar}&status=drive`, { method: 'PATCH' }).then(res => {
      if(res.ok){
        resp = res.json();
      } else {
        resp = 'error';
      }
    }).catch(err => console.log(err)
    )

    return resp;

}

export async function stopEngine(indexOfCar:number) {
  const resp = (
    await fetch(`http://127.0.0.1:3000/engine?id=${indexOfCar}&status=stopped`, { method: 'PATCH' })
  ).json();
  console.log(await resp);
}

export function animateSVG(svgElement: HTMLElement, speed: number){
  let currentPosition = 0;

  // animate the SVG element with a setInterval
  let animInterval = setInterval(() => {
  // increase the current position
  currentPosition += speed;
  // apply the current position to the svg element
  svgElement.style.transform = `translateX(${currentPosition}px)`;
  }, 16);

  // return the animation interval so it can be cleared if necessary
  return animInterval;
  }
