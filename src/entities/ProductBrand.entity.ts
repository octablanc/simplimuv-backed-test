import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "product_brand",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: ()=> v4()
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // product_type_id: { // Agrega la columna product_type_id
            //     type: DataTypes.UUID,
            //     allowNull: false,
            //     references: {
            //         model: ProductType, // Referencia al modelo de product_type
            //         key: 'id' // Clave primaria en la tabla product_type
            //     }
            // }
        },
        { freezeTableName: true, timestamps: false }
    );
