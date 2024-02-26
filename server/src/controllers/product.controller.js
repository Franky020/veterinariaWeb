//IMPORTS
const Product = require('../models/product.model');
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')
//functions

//----------------------------------get
async function getProducts(req,res){
    try {
       let products = await Product.find({state:'activo'}).select('_id product category specie image price');
       return res.status(200).json({products});  
    } catch (error) {
        return res.status(500).json({error:`Error encontrado ${error.message}`});
    }
}

//------------------------------getId
async function getIdProduct(req,res){
    try {
        const {id} = req.params;

        let product = await Product.findOne({_id:id, state:'activo'}).select('product description price quantity category specie image image2');

        if(!product){
            return res.status(404).json({message:'Producto no Encontrado'});
        }

        return res.status(200).json({product});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//---------------------------------post

async function registerProduct(req, res) {
    try {
        const { product, description, price, category, quantity, specie } = req.body;

        let newProduct = new Product({
            product,
            description,
            price,
            quantity,
            category,
            specie
        });

        if (req.files && req.files['image']) {
            const { filename } = req.files['image'][0];
            newProduct.setimgurl(filename);
        }
        if (req.files && req.files['image2']) {
            const { filename } = req.files['image2'][0];
            newProduct.setimgurl2(filename);
        }
        

        await newProduct.save();

        return res.status(201).json({ success: 'Producto Guardado' });

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.product) {
            return res.status(400).json({ error: 'Producto ya registrado' });
        }
        return res.status(500).json({ error: `Error encontrado: ${error.message}` });
    }
}



//------------------------------------put
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { product, description, price, category, quantity,  specie } = req.body;

        let produc = await Product.findOne({ _id: id, state: 'activo' });

        if (!produc) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        let urlfotoanterior;
        let urlfotoanterior2;

        const updateFields = {
            product,
            description,
            price,
            quantity,
            category,
            specie
        };
        await Product.findByIdAndUpdate(id, updateFields, { new: true });


        if (  req.files &&  req.files['image']) {
            
            if(produc.image){
             urlfotoanterior = produc.image.split("/");
            }

            const { filename } = req.files['image'][0];
            produc.setimgurl(filename);
            await produc.save();

            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior[4]))) {
                try {
                    await fs.unlink(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior[4]));
                } catch (error) {
                    console.error('Error al eliminar la imagen anterior:', error);
                    // Manejar el error adecuadamente, ya sea enviando una respuesta de error al cliente o tomando otra acción
                }
            }
        }

        if (req.files &&  req.files['image2']) {
            if(produc.image2){
                urlfotoanterior2 = produc.image2.split("/");
            }

            const { filename } = req.files['image2'][0];
            produc.setimgurl2(filename);
            await produc.save();

            if (urlfotoanterior2 && fs.existsSync(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior2[4]))) {
                try {
                    await fs.unlink(path.join(__dirname, '../public/uploads/product/' + urlfotoanterior2[4]));
                } catch (error) {
                    console.error('Error al eliminar la imagen anterior:', error);
                    // Manejar el error adecuadamente, ya sea enviando una respuesta de error al cliente o tomando otra acción
                }
            }
        }
        return res.status(201).json({ message: 'Producto actualizado exitosamente' });

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}



//-------------------------------------------delete

async function deleteProduct(req,res){
    try {
        const {id} = req.params;
        let product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:'Prodcuto no Encontrado'});
        }

        await Product.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});
        
        return res.status(200).json({success: 'Producto Eliminado'});


    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Producto proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

module.exports = {
    deleteProduct,
    getProducts,
    getIdProduct,
    registerProduct,
    updateProduct
}