import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import {getAllProducts} from '../api'

import {getCurrentUser, getCurrentToken} from '../auth'
import {ProductInput} from './index'

import {Prod} from './index'

const MainBoard = (props) => {
    const {setFetchId, user} = props
    const [productRender, setProductRender] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [categorysel, setCategorysel] = useState('')
    const [adminToggle, setAdminToggle] = useState(false)
    

    async function fetchProducts(){
      try{
    const data = await getAllProducts()
    console.log('data array ', data)
    console.log('category ', categorysel)
    setProductRender(data)
    setFetchId(selectedId)
      }catch(error){
        console.log(error)
      }
    }

    
    useEffect(() => {
    fetchProducts()
      },[selectedId]);
      console.log('set render ',productRender)

    return <><div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
      {user && user.isadmin ? <Button onClick={() => {setAdminToggle(!adminToggle)}} style={{margin:'.4rem'}} variant="primary" size="lg" block>
{adminToggle ? 'Cancel' : 'Post New Product'}
  </Button> : null}
  {adminToggle ? <ProductInput setAdminToggle={setAdminToggle} /> : null}
        <h3 style={{marginTop: '.4rem', marginLeft: '1rem'}}>You Are Now Viewing {categorysel ? `All ${categorysel}s` : 'All Items'}</h3>
        {categorysel ? <Button style={{marginTop: '.4rem', marginRight: '1rem'}} onClick={() => {setCategorysel('')}}>Unfilter Products</Button> : null}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
{productRender.map((product) => {
    if (categorysel === ''){
    return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} />}
    else if (categorysel !== ''){
        if(product.category === categorysel){
            return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} />
        }
    }
})}
    </div></>
}

export default MainBoard;