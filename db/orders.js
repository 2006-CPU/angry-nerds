const {client} = require("./index")

/* THIS IS FOR THE getAllOrders ADAPTER */

    async function getAllOrders() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM orders
            `)
            return rows;
        } catch (error) {
            throw error
        }
    }

/* THIS IS FOR THE getOrderById ADAPTER */

    async function getOrderById(id) {
        try {
            const { rows: [ order ] } = await client.query(`
            SELECT * FROM orders
            Where id = $1
            `, [id])
            return order;
        } catch (error) {
            throw error;
        }
    }
   
/* THIS IS FOR THE getOrdersByUser ADAPTER */

    async function getOrdersByUser(id) {
        try {
            const { rows: order }  = await client.query(`
            SELECT orders.*, users.id AS "userId"
            FROM orders
            JOIN users ON users.id = orders."userId"
            WHERE users.id = $1;
            `, [id]);

            return order;
        } catch (error) {
            throw error;
        }
    }

    /* THIS IS FOR THE createOrder ADAPTER */
    async function createOrder({ status, userId, datePlaced }) {
        try {
            const { rows: [ order ] } = await client.query(`
                INSERT INTO orders
                (status, "userId", "datePlaced")
                VALUES($1, $2, $3)
                RETURNING *
            `, [status, userId, datePlaced]);

            return order;
        } catch (error) {
            throw error;
        }
    }

    /* THIS IS FOR THE getCartByUser ADAPTER */
    async function getCartByUser(id) {
        try {
            const { rows:  [cart]  } = await
            client.query(`
            SELECT * FROM orders
            WHERE status = 'created'
            AND "userId" = $1
            `, [ id ])

            const { rows: products} = await client.query(`
            SELECT products.*
            FROM products
            JOIN order_products ON products.id=order_products."orderId"
            WHERE order_products."orderId"=$1;
            `, [cart.id])

            cart.products = products
            console.log("cart products", cart)
            return cart
        } catch (error) {
            throw error;
        }
    }

    async function updateOrder({id, ...fields}) {
        const setString = Object.keys(fields).map(
            (key, index) => `"${ key }"=$${ index + 1 }`
        ).join(', ');
        
        const objVals = Object.values(fields)
    
        if (setString.length === 0) {
            return;
        }
    
        objVals.push(id)
    
        try {
            if(setString.length > 0){
                const { rows:  [order]  } = await
                client.query(`
                UPDATE orders
                SET ${setString}
                WHERE id=$${objVals.length}
                RETURNING *;
                `, objVals);
                
                return order
            }
    
        } catch (error) {
            throw error;
        }
    }
    
    async function completeOrder({id}) {
        try {
            const { rows:  [order]  } = await
            client.query(`
            UPDATE orders
            SET status='completed'
            WHERE id=$1
            RETURNING *;
            `, [ id ])
    
            return order
        } catch (error) {
            throw error;
        }
    }
    
    async function cancelOrder({id}) {
        try {
            const { rows:  [order]  } = await
            client.query(`
            UPDATE orders
            SET status='cancelled'
            WHERE id=$1
            RETURNING *;
            `, [ id ])
    
            return order
        } catch (error) {
            throw error;
        }
    }
    
    
module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    createOrder,
    getCartByUser,
    updateOrder,
    completeOrder,
    cancelOrder
}