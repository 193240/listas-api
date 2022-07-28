const { Router } = require('express');
const router = new Router();
const connection = require('../database2');

//me trae todas las listas del usuario con total y cantidad de productos
router.get('/user/:id', (request, response) => {
    const id = request.params.id;
    const script="SELECT list_Products.idlist_Products,list_Products.name,list_Products.activo,sum(list_items.price) as precioLista,count(list_Products_Details.idlist_Products) as productosC FROM list_Products left JOIN list_Products_Details ON list_Products.idlist_Products = list_Products_Details.idlist_Products left JOIN list_items ON list_Products_Details.product_id= list_items.id left JOIN products ON products.id = list_items.id_product WHERE list_Products.user_id = ? and activo=0 GROUP BY list_Products.idlist_Products";
    connection.query(script,id, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});
//retorna la lista que esta activa
router.get('/user-active/:id', (request, response) => {
    const id = request.params.id;
    const script="SELECT list_Products.idlist_Products,list_Products.name,list_Products.activo,sum(list_items.price) as precioLista,count(list_Products_Details.idlist_Products) as productosC FROM list_Products left JOIN list_Products_Details ON list_Products.idlist_Products = list_Products_Details.idlist_Products left JOIN list_items ON list_Products_Details.product_id= list_items.id left JOIN products ON products.id = list_items.id_product WHERE list_Products.user_id = ? and activo=1 GROUP BY list_Products.idlist_Products;";
    connection.query(script,id, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});
//agrega lista
router.post('/new', (request, response) => {
    connection.query('INSERT INTO list_Products SET ?', request.body, (error, result) => {
        if (error) throw error;
        response.status(201).send(`List added with ID: ${result.insertId}`);
    });
});


// actualiza todas las listas a inactivas
router.put('/inactivo/:id', (request, response) => {
    const id = request.params.id;
    connection.query('UPDATE list_Products SET activo=0 WHERE user_id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully: '+result.affectedRows);
    });
});
// actualiza todas las listas a inactivas
router.put('/activo/:id', (request, response) => {
    const id = request.params.id;
    connection.query('UPDATE list_Products SET activo=1 WHERE idlist_Products = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully: '+result.affectedRows);
    });
});

// actualiza nombre o activo de lista
router.put('/update/:id', (request, response) => {
    const id = request.params.id;
    connection.query('UPDATE list_Products SET ? WHERE idlist_Products = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully: '+result.affectedRows);
    });
});
//elimina la lista
router.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    connection.query('DELETE FROM list_Products WHERE idlist_Products = ?', id, (error, result) => {
        if (error) throw error;
        response.send('List deleted:'+result.affectedRows);
    });
});

module.exports = router;