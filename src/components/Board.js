import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import {getAllProducts} from '../api'

import {getCurrentUser, getCurrentToken, getCurrentCart} from '../auth'
import {ProductInput} from './index'

import {Prod, Footer} from './index'

const MainBoard = (props) => {
    const {setFetchId, user} = props
    const [productRender, setProductRender] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [categorysel, setCategorysel] = useState('')
    const [adminToggle, setAdminToggle] = useState(false)
    const [inCart, setInCart] = useState(getCurrentCart())
    

    async function fetchProducts(){
      try{
    const data = await getAllProducts()
    setProductRender(data)
    setFetchId(selectedId)
      }catch(error){
        console.log(error)
      }
    }

    
    useEffect(() => {
    fetchProducts()
      },[]);

    return <><div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
      {user && user.isadmin ? <Button onClick={() => {setAdminToggle(!adminToggle)}} style={{margin:'.4rem'}} variant="primary" size="lg" block>
{adminToggle ? 'Cancel' : 'Post New Product'}
  </Button> : null}
  {adminToggle ? <ProductInput setAdminToggle={setAdminToggle} /> : null}
        <h3 style={{marginTop: '.5rem', marginLeft: '1rem'}}>You Are Now Viewing {categorysel ? `All ${categorysel}s` : 'All Items'}</h3>
        {categorysel ? <Button style={{marginTop: '.4rem', marginRight: '1rem'}} onClick={() => {setCategorysel('')}}>Unfilter Products</Button> : null}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
{productRender.map((product) => {
  const added = inCart.some(cartProd => cartProd.id === product.id)
  if(added){
    if (categorysel === ''){
    return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} inCart={true} />
          }
    else if (categorysel !== ''){
        if(product.category === categorysel){
            return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} inCart={true} />
        }
    }} else if(!added){
      if (categorysel === ''){
      return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} inCart={false} />}
      else if (categorysel !== ''){
          if(product.category === categorysel){
              return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} inCart={false} />
          }
      }}
})}
    </div>
    <div style={{height: '2.5rem', bottom: '0', left: '0', right: '0', backgroundColor: '#B0E0E6', paddingBottom: '1.5rem', marginTop: '3rem'}}>
      <div style={{textAlign: 'center', paddingTop: '.5rem'}}>Page 1</div>
      <Footer />
      </div></>
}

export default MainBoard;
