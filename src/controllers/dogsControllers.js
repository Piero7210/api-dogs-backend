const { Dog, Temperaments } = require("../db");
const axios = require("axios");


const getAllDogs = async () => {
  const apiDogsAll = await getAllDogsAtApi();
  const dbInfoAll = await getDogsAtDB();

  const allDataDogsContainer = apiDogsAll.concat(dbInfoAll);
  return allDataDogsContainer;
};

const getAllDogsAtApi = async () => {
  const dogs = await axios.get("https://api.thedogapi.com/v1/breeds");
  const results = dogs.data;

  const dogsDetails = results.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperament,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
      height_min: parseInt(dog.height.metric.split("-")[0]),
      height_max: parseInt(dog.height.metric.split("-")[1]),
      weight_min: parseInt(dog.weight.imperial.split("-")[0]),
      weight_max: parseInt(dog.weight.imperial.split("-")[1]),
      life_span: dog.life_span,
    };
  });
  return dogsDetails;
};

const getDogsAtDB = async () => {
  let doggy = await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  doggy = doggy.map(dog => {return {
    id: dog.id,
    name:dog.name,
    weight_min: dog.weight_min,
    weight_max: dog.weight_max,
    lifeTime: dog.lifeTime,
    image: dog.image,
    createdInDb: dog.createdInDb,
    height_min: dog.height_min,
    height_max: dog.height_max,
    temperament : dog.temperaments.map(e => {return e.name}).join(',')
}})
return doggy;
};

const getDogsById = async (idRaza) => {
  // const dogId = axios.get(
  //   `https://api.thedogapi.com/v1/breeds/search?q=${idRaza}`
  // );
  const allDogs = await getAllDogs()
  const dogSelected = allDogs.filter((dog) => dog.id == idRaza)
  if (dogSelected.length){
      return dogSelected
  } 
};


module.exports = {
  getAllDogs,
  getDogsById
};
