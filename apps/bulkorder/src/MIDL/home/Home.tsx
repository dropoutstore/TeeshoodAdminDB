import React from 'react'
import { BulkOrder } from '../Order/bulk/BulkOrder'
import {POD} from '../Order/POD'
import { Title } from '@mantine/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'


export default function Home() {
    const {companyProfile} = useSelector((state:RootState)=>state.Company)
  return (
    <div className="text-center">
    <div className="p-2">
        <Title className='py-6' >
            Welcome {companyProfile?.userName} 
        </Title>
      <div className="p-2 md:p-6 py-10 w-full grid grid-cols-1 md:grid-cols-2 justify-center gap-10 bg-white rounded-xl">
        <BulkOrder />
        <POD />
      </div>
    </div>
  </div>
  )
}