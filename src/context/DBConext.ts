import { Sequelize } from "sequelize";
import ProductEntity from "../entities/Product.entity";
import ProductBrandEntity from "../entities/ProductBrand.entity";
import ProductCategoryEntity from "../entities/ProductCategory.entity";
import ProductTypeEntity from "../entities/ProductType.entity";
import ProductVariantEntity from "../entities/ProductVariant.entity";
import VariantEntity from "../entities/Variant.entity";
import VariantDetailEntity from "../entities/VariantDetail.entity";
import VariantImageEntity from "../entities/VariantImage.entity";
import LeadEntity from "../entities/Lead.entity";
import ContactEntity from "../entities/Contact.entity";
import AppConfigEntity from "../entities/AppConfig.entity";

require("dotenv").config();

const { DB_URL } = process.env;

const DBcontext = new Sequelize(`${DB_URL}`, {
    logging: false,
    native: false,
});

const Product = ProductEntity(DBcontext);
const ProductBrand = ProductBrandEntity(DBcontext);
const ProductCategory = ProductCategoryEntity(DBcontext);
const ProductType = ProductTypeEntity(DBcontext);
const ProductVariant = ProductVariantEntity(DBcontext);
const Variant = VariantEntity(DBcontext);
const VariantDetail = VariantDetailEntity(DBcontext);
const VariantImage = VariantImageEntity(DBcontext);
const Lead = LeadEntity(DBcontext);
const Contact = ContactEntity(DBcontext);
AppConfigEntity(DBcontext);

ProductBrand.hasMany(Product);
Product.belongsTo(ProductBrand);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

ProductCategory.hasMany(Product);
Product.belongsTo(ProductCategory);

Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product);

Variant.hasMany(ProductVariant);
ProductVariant.belongsTo(Variant);

Variant.hasMany(VariantDetail);
VariantDetail.belongsTo(Variant);

Variant.hasMany(VariantImage);
VariantImage.belongsTo(Variant);

Contact.hasOne(Lead);
Lead.belongsTo(Contact);


export default DBcontext;