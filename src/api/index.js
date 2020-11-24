import axios from 'axios';


export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log("productId: id", id)
    console.log("productId:", data)
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

export const callApi = async ({method, body, url, token}) => {
  try {
      const options = {
          method: method || 'get',
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
