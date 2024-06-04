import express, { Request, Response } from "express";
import Product from "../models/Product.model";
import ProductTypeModel from "../models/ProductType.model";
import ProductCategoryModel from "../models/ProductCategory.model";
import ProductBrandModel from "../models/ProductBrand.model";
import ProductVariantModel from "../models/ProductVariant.model";
import VariantModel from "../models/Variant.model";
import VariantDetailModel from "../models/VariantDetail.model";
import VariantImageModel from "../models/VariantImage.model";
import Joi from "joi";
const productRouter = express.Router();

const getProductsQuerySchema = Joi.object({
    category_name: Joi.string().required(),
    uuid: Joi.string().uuid()
});

const pageSchema = Joi.object({
    page: Joi.number().integer().min(1)
});

async function getProducts(req: Request, res: Response) {
    const { category_name } = req.params;
    const { uuid, page } = req.query;
    const { error: errorCategoryOrId } = getProductsQuerySchema.validate({ category_name, uuid });

    try {
        if (errorCategoryOrId) {
            throw new Error(errorCategoryOrId.details[0].message);
        }

        if(page){
            const { error: errorPage } = pageSchema.validate({page});

            if (errorPage) {
                throw new Error(errorPage.details[0].message);
            }
        }

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
                    attributes: { exclude: ["productId", "variantId"] }
                }
            ],
            attributes: { exclude: ["productBrandId", "productTypeId", "productCategoryId"] },
            offset: page ? 100 * (Number(page) - 1) : 0,
            limit: 100
        };

        const result = uuid ? await Product.findByPk(uuid.toString(), query) : await Product.findAll(query);

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