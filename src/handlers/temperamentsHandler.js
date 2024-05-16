const { Temperaments } = require("../db");
const axios = require("axios");

const getTemperamentsHandler = async (req, res) => {
  try {
    const apiDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    const dogs = await apiDogs.data.map((element) => element.temperament);
    let perrosSplit = await dogs.join().split(",");
    let perrosTrim = await perrosSplit.map((e) => e.trim());
    await perrosTrim.forEach(async (e) => {
      if (e.length > 0) {
        await Temperaments.findOrCreate({
          where: { name: e },
        });
      }
    });
    const allTemperament = await Temperaments.findAll();
    // console.log(allTemperament)
    return res.status(200).json(allTemperament);
  } catch (error) {
    res.status(404).send({ error: "There are not temperaments" });
  }
};

module.exports = {
  getTemperamentsHandler,
};
