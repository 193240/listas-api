
const { Router } = require('express');
const router = new Router();
const connection = require('../database2');


//me trae todas los productos dela lista respecto id de lista
router.get('/products/:id', (request, response) => {
    const id = request.params.id;
    const script="SELECT  list_Products_Details.id_list_details,products.name, products.url_image,list_Products_Details.cantidad, list_items.price,shop.name as tienda FROM list_Products inner JOIN list_Products_Details ON list_Products.idlist_Products = list_Products_Details.idlist_Products inner JOIN list_items ON list_Products_Details.product_id= list_items.id inner JOIN products ON products.id = list_items.id_product inner JOIN shop ON products.shop_id = shop.id WHERE list_Products.idlist_Products = ?"
    connection.query(script,id, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

//agrega una nueva producto a lista
router.post('/add', (request, response) => {
    connection.query('INSERT INTO list_Products_Details SET ?', request.body, (error, result) => {
        if (error) throw error;
        response.status(201).send(`List added with ID: ${result.insertId}`);
    });
});

// actualiza cantidad del producto
router.put('/update/:id', (request, response) => {
    const id = request.params.id;
    connection.query('UPDATE list_Products_Details SET ? where id_list_details=?',[request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully: '+result.affectedRows);
    });
});
//elimina la lista
router.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    connection.query('DELETE FROM list_Products_Details WHERE id_list_details = ?', id, (error, result) => {
        if (error) throw error;
        response.send('List deleted:'+result.affectedRows);
    });
});
module.exports = router;