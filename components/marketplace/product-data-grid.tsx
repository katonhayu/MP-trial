"use client"

import React from 'react'
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  Sorting,
  SearchPanel,
  Selection,
  Editing,
} from 'devextreme-react/data-grid'
import { mockProducts } from '@/lib/mock-data'

type Product = typeof mockProducts[number]

export function ProductDataGrid({ products }: { products?: Product[] }) {
  const dataSource = products ?? mockProducts

  return (
    <div className="w-full">
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        defaultPaging={{ pageSize: 10 }}
        height={600}
      >
        <SearchPanel visible={true} placeholder="Search..." />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Sorting mode="multiple" />
        <Selection mode="multiple" />
        <Editing mode="row" allowUpdating={false} allowDeleting={false} allowAdding={false} />

        <Column dataField="id" caption="ID" width={80} />
        <Column dataField="title" caption="Title" />
        <Column dataField="category" caption="Category" />
        <Column dataField="price" caption="Price" dataType="number" format="currency" />
        <Column dataField="rating" caption="Rating" dataType="number" />
        <Column dataField="downloadCount" caption="Downloads" dataType="number" />
        <Column dataField="featured" caption="Featured" dataType="boolean" />
        <Column dataField="createdAt" caption="Created" dataType="date" />

        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} showInfo={true} />
      </DataGrid>
    </div>
  )
}

export default ProductDataGrid
