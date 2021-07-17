import axios from 'axios';


export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get('/api/users');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategory(category) {
  try {
    const { data } = await axios.get(`/api/products/category/${category}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCart() {
  try {
    const { data } = await axios.get('/api/orders/cart');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get('/api/orders');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderById(orderId) {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const callApi = async ({method, body, url, token}) => {
  try {
      const options = {
          method: method || 'GET',
          data: body,
          url: `${url}`
      }
      /* if we have a token, pass another property to the options object */
      if(token) {
          options.headers = {
              'Authorization': `Bearer ${token}`
          }
      }
      const {data} = await axios(options)
      return data;
  } catch(error) {
      console.error(error)
  }
}

export async function createOrder(status, userId, datePlaced) {
  try {
    const { data } = await axios.post('/api/orders', {status, userId, datePlaced});
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProductToOrder(orderId, productId, price, quantity) {
  
  const bodyParameters = {
    orderId,
    productId,
    price,
    quantity
 };
  try {
    const { data } = await axios.post(`/api/orders/${orderId}/products`, bodyParameters);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrderProduct(orderProductId) {
  
  try {
      const {data} = await axios.delete(`/api/order_products/${orderProductId}`);
      return data;
  } catch (error) {
      console.error(error);
  }
}

export async function createProduct(name, description, price, inStock, imageURL, category) {
  try {
    const { data } = await axios.post('/api/products', {name, description, price, inStock, imageURL, category});
    return data;
  } catch(error) {
    throw error;
  }
}

export async function destroyProduct(id) {
  try {
    const {data} = await axios.delete(`/api/products/${id}`)
    return data
  } catch (error) {
    throw error;
  }
}

export async function makeReview( title, content, userId, productId ) {

  try {
    const { data } = await axios.post(`/api/${productId}/reviews`, {title, content, userId, productId} );
    return data;
  } catch(error) {
    throw error;
  }

}