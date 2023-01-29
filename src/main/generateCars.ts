interface IGeneratedCar {
  name: string;
  color: string;
}

export default async function generateCars() {
  const names = [
    'Tesla',
    'Lada',
    'BMW',
    'Ford',
    'Honda',
    'Mazda',
    'Nissan',
    'Renault',
    'Mersedes-Benz',
    'Hyundai',
    'Audi',
    'Ancura',
    'Suzuki',
    'Toyota',
    'Infiniti',
    'Daihatsu',
  ];

  const marks = [
    'CL',
    'CSX',
    'Integra',
    'MDX',
    'NSX',
    'RDX',
    'RL',
    'TL',
    'ZDX',
    'EB 110',
    'Veyron',
    'Granta',
    'Kalina',
    '440',
    '460',
    '850',
    '940',
  ];

  function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  async function post(body:IGeneratedCar) {
    await fetch('http://127.0.0.1:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  async function generateNameAndColor(nameCars:string[], markCars:string[]) {
    for (let i = 0; i < 100; i += 1) {
      const n = `${names[getRandomInt(nameCars.length)]} ${marks[getRandomInt(markCars.length)]}`;

      const c = `#${(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()}`;
      const b = { name: n, color: c };
      await post(b);
    }
  }

  await generateNameAndColor(names, marks);

}
