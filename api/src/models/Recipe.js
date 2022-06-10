const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    createDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  });
};
