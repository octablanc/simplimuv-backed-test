import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "product_category",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => v4()
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        { freezeTableName: true, timestamps: false }
    );

