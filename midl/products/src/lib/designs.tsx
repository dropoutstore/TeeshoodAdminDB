import React from 'react'
import { designType } from './ProductsExpanded'
import { ActionIcon } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'

type Props = {
    designs:designType[]
    action:(d:designType)=>any
}

export default function ProductDesigns({designs,action}: Props) {
  return (
   // eslint-disable-next-line react/jsx-no-useless-fragment
   <>
      {designs?.map((design: designType,index) => (
        <div className="relative h-96 ">
          <ActionIcon
            onClick={()=>action({...design,index})}
            className="absolute right-1 top-1"
            variant="filled"
            color="red"

          >
            <IconEdit />
          </ActionIcon>
          <ShowDesign design={design} />
        </div>
      ))}
   </>
  )
}



export const ShowDesign = ({design}:{design:designType}) =>(
    
    <>
    <div className='h-80 w-80 flex items-center justify-center' >
            <img src={design.image} alt={design.sideName} className="max-w-full max-h-full" />
          </div>
          <div className='font-bold text-lg' >{design.sideName}</div>
          <div className='font-bold text-lg' >{design.size}</div>
    </>
)