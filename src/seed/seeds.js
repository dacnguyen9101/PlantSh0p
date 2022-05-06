const axios = require('axios');
const plants = require('./seeds.json');


const PlantStatus = ['Hết hàng', 'Có sẵn', 'Không kinh doanh'];

plants.forEach((plant) => {
  axios
    .post('http://localhost:3000/plants', {
      name: plant.title,
      price: parseInt(plant.price),
      category: plant.type,
      status: PlantStatus[Math.floor(Math.random() * PlantStatus.length)],
      description: plant.desc,
      imgPath: plant.imgPath,
      quantity: plant.quantity,
      importedDate: plant.importedDate,
    })
    .then((response) => {
      console.log(response);
    });
});

// axios
//   .get('http://localhost:3000/plants/afcba66d-d502-4490-b85d-0919090f400c')
//   .then((res) => console.log(res));
