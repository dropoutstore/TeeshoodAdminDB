/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Table } from '@mantine/core';
import { PODOrderType } from './types';
import { PODFileColumns } from './column';
import { ViewDesign } from './viewDesign';
type Props = {
  PODOrder: PODOrderType;
};

export default function OrdersExpanded({ PODOrder }: Props) {
  return (
    <div className="text-center">
      <div className="">
        {PODOrder.orders.map((product) => (
          <div className="mx-auto">
            <h2>{product.Notes}</h2>
            <div className="p-4 md:px-10 mx-auto overflow-auto">
              <Table striped highlightOnHover withBorder className="relative">
                <thead className="sticky z-10 bg-white">
                  <tr>
                    <th>Designs</th>
                    <th>Export</th>
                    {PODFileColumns.map((key) => (
                      <th key={key?.field}>{key?.columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PODOrder.orders.map((order, index) => (
                    <tr key={index} className="h-72">
                      <td
                      // className="fixed w-96 z-10"
                      >
                        {/* <Button>Add Design</Button> */}
                        <div>
                          <img
                            src={
                              order.design?.previews
                                ? order.design.previews[0]
                                : ''
                            }
                            className="w-20"
                            alt=""
                          />
                        </div>
                      </td>
                      <td
                      // className="fixed w-96 z-10"
                      >
                        {/* <Button>Add Design</Button> */}
                       <ViewDesign order={order} />
                      </td>
                      {/* <td>
                    <div className="w-48"></div>
                  </td> */}
                      {PODFileColumns.map((key) => (
                        <td>
                          {/* 
                                // @ts-ignore */}
                          <div className="w-full min-w-max" key={key.field} />
                          {order[key.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ))}
      </div>
      <Button>Download</Button>
    </div>
  );
}
