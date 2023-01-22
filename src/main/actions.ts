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
