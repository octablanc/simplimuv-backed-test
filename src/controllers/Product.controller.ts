import express, { Request, Response } from "express";
import Product from "../models/Product.model";
import ProductTypeModel from "../models/ProductType.model";
import ProductCategoryModel from "../models/ProductCategory.model";
import ProductBrandModel from "../models/ProductBrand.model";
import ProductVariantModel from "../models/ProductVariant.model";
import VariantModel from "../models/Variant.model";
import VariantDetailModel from "../models/VariantDetail.model";
import VariantImageModel from "../models/VariantImage.model";
const productRouter = express.Router();

async function getProducts(req: Request, res: Response) {
    const { category_name } = req.params;
    const { uuid } = req.query;

    try {
        const query = {
            include: [
                {
                    model: ProductCategoryModel,
                    where: {
                        name: category_name
                    }
                },
                {
                    model: ProductTypeModel
                },
                {
                    model: ProductBrandModel
                },
                {
                    model: ProductVariantModel,
                    include: [
                        {
                            model: VariantModel,
                            include: [
                                {
                                    model: VariantDetailModel
                                },
                                {
                                    model: VariantImageModel
                                }
                            ]
                        }
                    ],
                    attributes: { exclude: [ "productId", "variantId"] }
                }
            ],
            attributes: { exclude: [ "productBrandId", "productTypeId", "productCategoryId" ] }
        };

        const result = uuid? await Product.findByPk(uuid.toString(), query) : await Product.findAll(query);

        if (!result)
            throw Error("Not found.");

        return res.send(result);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).send({ message: error.message });
        else
            return res.status(400).send({ error });
    }
}

productRouter.get("/:category_name", getProducts);

export default productRouter;