import {CMI} from "@admin/cmi"
import { ProductTable } from "./productTable"
import {  Title } from "@mantine/core"
import ProductForm from "./productForm"
import { BulkProductUpload } from "./BulkProductUpload"
export function Products() {
  return (
    <div className=" p-4" >
      <div className="flex justify-between ">
        <div/>
      {/* <Title className="">Products</Title> */}
      {/* <BulkProductUpload /> */}
      {/* <ProductForm /> */}
      </div>
      {/* <ProductTable /> */}
      <CMI />
    </div>
  )
}