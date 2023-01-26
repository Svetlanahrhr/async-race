import CreateElement from '../helpers/CreateElement';
let test: number;
let popup: HTMLElement;
let winner: IWinner = {
    id: 0,
    wins: 0,
    time: 0,
};

export interface IWinner {
  id?: number,
  wins?: number,
  time?: number
}

export async function selectCar(indexOfCar: number) {
    const resp = await fetch(`http://127.0.0.1:3000/garage/${indexOfCar}`);
    const car = await resp.json();

    (document.querySelector('#update') as HTMLInputElement).value = car.name;
    (document.querySelector('.update-color') as HTMLInputElement).value = car.color;
    document.querySelector(`.name${indexOfCar}`).classList.add('selected');
}

export async function updateCar(id: number) {
    const resp = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: (document.querySelector('#update') as HTMLInputElement).value,
            color: (document.querySelector('.update-color') as HTMLInputElement).value,
        }),
    });
    await resp.json();
    return;
}

export async function createCar(body: object) {
    const resp = await fetch(`http://127.0.0.1:3000/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return;
}

export async function deleteCar(id: number) {
    const resp = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
    });
    return;
}

export async function startEngine(indexOfCar: number) {
    const resp = await fetch(`http://127.0.0.1:3000/engine?id=${indexOfCar}&status=started`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: 'started',
        }),
    });
    const r = await resp.json();
    const { velocity, distance } = r;
    const duration = Math.round(distance / velocity);

    return duration;
}

export async function driveCar(indexOfCar: number) {
    await fetch(`http://127.0.0.1:3000/engine?id=${indexOfCar}&status=drive`, { method: 'PATCH' })
        .then((res) => {
            if (!res.ok) {
                cancelAnimationFrame(test);
            }
        })
        .catch((err) => console.log(err));
}

export async function stopEngine(indexOfCar: number) {
    fetch(`http://127.0.0.1:3000/engine?id=${indexOfCar}&status=stopped`, { method: 'PATCH' });

    let svg = document.querySelector(`.icon${indexOfCar}`) as HTMLElement;
    cancelAnimationFrame(test);
    svg.style.transform = `translateX(${0}px)`;
    clearInterval(test);
}

export function moveCar(svg: HTMLElement, duration: number, indexOfCar: number) {
    let road = document.querySelector('.road') as HTMLDivElement;
    let endX = road.getBoundingClientRect().width;
    let currentX: number;
    currentX = svg.getBoundingClientRect().left;
    const framesCount = (duration / 1000) * 60;
    const dX = (endX - svg.getBoundingClientRect().left) / framesCount;
    const tick = () => {
        currentX += dX;

        svg.style.transform = `translateX(${currentX}px)`;

        if (currentX + 100 < endX) {
            test = requestAnimationFrame(tick);
        } else {
            if (winner.id === 0) {
                winner.id = indexOfCar;
                winner.time = duration;
                showWinner(winner);

                createWinner(
                  winner
                )
            }
        }
    };
    tick();

    winner.id = 0;
    return test;
}

function showWinner(winner: IWinner) {
    if (document.querySelector('.popup')) {
        document.querySelector('.popup').classList.remove('hide');
        document.querySelector('.popup').innerHTML = `Winner is №${winner.id} duration is ${winner.time}`;
    } else {
        popup = new CreateElement(
            'div',
            `Winner is car №${winner.id} with time: ${winner.time}s`,
            'popup'
        ).getElement();
        document.querySelector('.container').append(popup);
    }
}

export async function createWinner(body: IWinner) {
  let countOfWins;
  let winner:IWinner = await getWinner(body.id);
  console.log(winner, 'winner in creatwinner');

  if (Object.keys(winner).length !== 0) {
    console.log('Object.keys(winner)',Object.keys(winner));

    countOfWins = winner.wins;
    countOfWins++;
    body.wins = countOfWins;
    const resp = await fetch(`http://127.0.0.1:3000/winners/${body.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
  });
  resp.json;
  } else {
    body.wins = 1;
    console.log(body, 'body');


    const resp = await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    resp.json;
  }

}

export async function getWinner(indexOfCar: number) {
//   let winner:IWinner;
  let resp = await fetch(`http://127.0.0.1:3000/winners/${indexOfCar}`);
  let winner:IWinner = await resp.json();
  console.log(winner, 'winner');


  return winner ? winner : {};
}
let pageNumber = 1;
export async function getWinners() {
//   const resp = await fetch(`http://127.0.0.1:3000/winners?_page=${pageNumber}&_limit=7`);
  const resp = await fetch(`http://127.0.0.1:3000/winners`);
  const winners = await resp.json();
  console.log({winners});

  return winners;
}

getWinners()
