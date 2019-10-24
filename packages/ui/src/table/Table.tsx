import * as React from 'react'
import { Table as AntTable, Tag, Pagination } from 'antd'
import styled from 'styled-components'
import 'antd/lib/table/style/index.css'
import 'antd/lib/tag/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { TableProps } from 'antd/lib/table'
import { Button, Icon } from '@frontend/ui'
import { observer } from 'mobx-react-lite'

export const Table = styled(AntTable) <TableProps<any>>`
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background-color: #ffefef;
  }
`

interface IDataSource {
  content: IListUser[]
  // last: boolean
  // page: number
  size: number
  totalElements: number
  // totalPages: number
  isLoading: boolean
  getPage: any
  handleUpdate:any
}
interface IListUser {
  id: string
  email: string
  fullName: string
  categories: ICategory[]
  active: boolean
}
interface ICategory {
  id: string
  name: string
}

const columnsForm =(handleUpdate)=>(
  [
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email'
    }, {
      key: 'fullName',
      dataIndex: 'fullName',
      title: 'Name'
    }, {
      key: 'categories',
      dataIndex: 'categories',
      title: 'Categories',
      render: ((categories) => (
        <span>
          {categories && categories.map((item) => (
            <Tag color="blue" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </span>
      ))
    },
    {
      key: 'active',
      dataIndex: 'active',
      title: 'Action',
      render: ((active, row, index) => (
        <span>
          <Button.Button 
          style={{ padding: '0px',border:'none' }}
          onClick={()=>handleUpdate(row.id)}>
            {active ?
              <Icon.Icon type="unlock" fontSize="25px" color="#33ff33"/>
              :
              <Icon.Icon type="lock" fontSize="25px" />
            }
          </Button.Button>
        </span>
      ))
    }]
)
export const TableForm: React.FunctionComponent<IDataSource> =observer(({
  content,
  totalElements,
  isLoading,
  size,
  getPage,
  handleUpdate
}) => {
  return (
    <>
      <AntTable
        pagination={false}
        dataSource={content}
        columns={columnsForm(handleUpdate)}
        loading={isLoading}
        rowKey="uid"
      />
      <br />
      <Pagination
        pageSize={size}
        total={totalElements}
        defaultCurrent={1}
        onChange={getPage}
      />
    </>
  )
}
)