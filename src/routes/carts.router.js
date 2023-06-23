import { Router } from "express";
import CartManager from "../CartManager.js";
const cartManager = new CartManager();

const router = Router();

router.post("",(req,res)=>{
    const newCart = cartManager.addCart();
    if (newCart == 'Carrito creado exitosamente') {
        res.status(201).json({ message: 'Carrito creado exitosamente' });
    } else {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get("/:id",(req,res)=>{
    const { id } = req.params
    const parsedId = parseInt(id); 
    const cart= cartManager.getCartById(parsedId)
    if (cart) return res.json(cart);
    else res.json({ error: "Carrito no encontrado" });
})

router.post("/:cid/product/:pid",(req,res)=>{
    const {cid,pid } = req.params;
    const parsedCid = parseInt(cid); 
    const parsedPId = parseInt(pid); 
    const { quantity } = req.body;
    const result= cartManager.addProductInCart(parsedCid,parsedPId,quantity)
    if (result === 'Producto agregado al carrito exitosamente') {
        res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
    } else if (result === 'Carrito no encontrado') {
        res.status(404).json({ error: 'Carrito no encontrado' });
    } else if (result === 'El producto no existe') {
        res.status(404).json({ error: 'El producto no existe' });
    }else {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});
export default router;
