import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import {getAllProducts} from '../api'
import {getCurrentCart} from '../auth'
import {Prod, Footer} from './index'

const HomePage = (props) => {
    const {setFetchId} = props
    const [productRender, setProductRender] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [inCart, setInCart] = useState(getCurrentCart())

    useEffect(() => {
        async function fetchProducts(){
          try{
        const data = await getAllProducts()
        setProductRender(data)
        setFetchId(selectedId)
          }catch(error){
            console.log(error)
          }
        }
    fetchProducts()
      },[selectedId]);

    return <div>
      <div>
        <Carousel>
          <Carousel.Item style={{width: '100%', maxHeight: '34rem'}}>
            <img
              className="d-block w-100"
              src="https://store-images.s-microsoft.com/image/apps.3780.14600436456605939.002f21b5-1ec5-42de-bb50-ad2d62814822.0e7d2807-7ad8-43bd-9039-112149dc5529"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Guitar Collection</h3>
              <p style={{textShadow: '1px 1px 2px #000'}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{width: '100%', maxHeight: '34rem'}}>
            <img
              className="d-block w-100"
              src="https://i.pinimg.com/originals/de/65/00/de6500daee98e24fcf5c22c9cf15c03e.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Piano Collection</h3>
              <p style={{textShadow: '1px 1px 2px #000'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{width: '100%', maxHeight: '34rem'}}>
            <img
              className="d-block w-100"
              src="https://images.wallpaperscraft.com/image/microphone_metal_device_149328_1920x1080.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 style={{textShadow: '1px 1px 2px #000'}}>Browse Our Microphone Collection</h3>
              <p style={{textShadow: '1px 1px 2px #000'}}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div style={{borderTop: '1px solid black', float:'bottom'}}>

      <div style={{ backgroundColor: 'lightgray', borderTop: '1px solid black',
      display: 'flex', /* flexWrap: 'wrap', */ flexDirection: 'row', /* padding: '1rem 7.5rem 7.5rem 17rem', */ flexShrink: '0', overflowX: 'scroll', width: '100%', height: '100%'}}>
      {productRender.map((product) => {
  const added = inCart.some(cartProd => cartProd.id === product.id)
  if(added){
    return <div style={{width: '18rem', margin: '.2rem'}}>
    <Prod key={product.id} product={product} setSelectedId={setSelectedId}inCart={true} />
  </div>}
  else if(!added){
    return <div style={{width: '18rem', margin: '.2rem'}}>
    <Prod key={product.id} product={product} setSelectedId={setSelectedId}inCart={false} />
  </div>}
})}
      </div>
<Footer />
      </div>
</div>

}

export default HomePage;