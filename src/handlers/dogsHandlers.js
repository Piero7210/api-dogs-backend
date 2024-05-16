const { Dog, Temperaments } = require("../db");

const { getAllDogs, getDogsById } = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => {
  const name = req.query.name;
  const allDogs = await getAllDogs();
  try {
    if (name) {
      const dogSelected = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogSelected.length > 0) {
        return res.status(200).json(dogSelected);
      } else {
        return res.status(404).send({ error: "The dog is missing" });
      }
    } else {
      return res.status(201).json(allDogs);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getDogsByIdHandler = async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dogResult = await getDogsById(idRaza);
    return res.status(200).send(dogResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDogsHandler = async (req, res) => {
  let {
    name,
    image,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    createdInDb,
    temperament,
  } = req.body;

  try {
    let dogCreated = await Dog.create({
      name,
      image: image
        ? image
        : "https://www.quever.news/u/fotografias/m/2021/11/13/f608x342-18737_48460_0.jpg",
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      createdInDb,
    });
  
    let tempDB = await Temperaments.findAll({
      where: { name: temperament },
    });
    dogCreated.addTemperament(tempDB);
    return res.status(200).json(dogCreated);
  } catch (error) {
    return res.status(500).json({error});
  }
};

module.exports = {
  getDogsHandler,
  getDogsByIdHandler,
  createDogsHandler,
};
