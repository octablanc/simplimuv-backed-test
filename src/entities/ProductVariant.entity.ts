import { Sequelize, DataTypes } from "sequelize";
import { v4 } from "uuid";

export default (sequelize: Sequelize) =>
    sequelize.define(
        "product_variant",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => v4()
            }
        },
        { freezeTableName: true, timestamps: false }
    );

