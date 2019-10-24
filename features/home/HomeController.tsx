import * as React from 'react'
import styled from 'styled-components'
import { Layout, Button, Input, Table,notification } from '@frontend/ui'
import { HomeAuthenBtnGroup, HomeAuthorizedBtnGr } from '../../components'
import { useAppContext } from '@frontend/core/src/context'
import { AppModel } from '../../models'
import { observer } from 'mobx-react-lite'
import { useEffectOnce } from 'react-use'

const Container = styled.div`
  height: 100%;
`
const Slogan = styled.div`
  font-size: 50px;
  color: #1e2d52;
  width: 100%;
  text-align: center;
  margin-top: 200px;
`

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  position: absolute;
  bottom: -25px;
  align-items: center;
`

const SearchInputContainer = styled.div`
  width: 50%;
  height: 100%;
  -webkit-box-shadow: -2px 13px 32px -6px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: -2px 13px 32px -6px rgba(0, 0, 0, 0.19);
  box-shadow: -2px 13px 32px -6px rgba(0, 0, 0, 0.19);
  background: #fff;
  border-radius: 5px;
  margin-right: 20px;
`
const SearchInput = styled(Input.Input)`
  &&& {
    height: 100%;
    border: none;
    padding-left: 20px;
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`
const SearchButton = styled(Button.Button)`
  &&& {
    height: 100%;
    width: 130px;
    text-transform: uppercase;
    -webkit-box-shadow: 1px 6px 25px -5px rgba(255, 98, 101, 1);
    -moz-box-shadow: 1px 6px 25px -5px rgba(255, 98, 101, 1);
    box-shadow: 1px 6px 25px -5px rgba(255, 98, 101, 1);
  }
`
const Content = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  min-height: calc(100vh - 500px);
  padding: 0 50px 50px 50px;
`
const MoreInfluencerBtn = styled(Button.Button)`
  &&& {
    background-color: transparent;
    border-radius: 30px;
    height: 50px;
  }
`
export const HomeController: React.FunctionComponent = observer(() => {
  const appModel = useAppContext() as AppModel
  const token = appModel.authModel.token
  const isLoading = appModel.authModel.isLoading
  const [pageIndex, setPageIndex] = React.useState(0);
  useEffectOnce(() => {
    appModel.authModel.getAllUser(pageIndex)
  })

  React.useEffect(() => {
    appModel.authModel.getAllUser(pageIndex)
  }, [pageIndex])
  const listUser = appModel.authModel.dataSource
  const getPage = (pageIndex) => {
    setPageIndex(pageIndex - 1);
  }

  const handleUpdate = async (id: string) => {
    try {
      await appModel.authModel.updateStatusUser(id,pageIndex)
      notification.success({
        message: 'Update status user successfully.',
        duration: 3,
        placement: 'bottomLeft',
      })
    } catch (error) {
      notification.error({
        message: 'Update status user failed.',
        duration: 3,
        placement: 'bottomLeft',
      })
      return error
    }
  }

  return (
    <Container>
      <Layout.Flex
        flexDirection="column"
        justifyContent="flex-start"
        style={{
          backgroundImage: 'url(/static/image/home.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: '200px',
          position: 'relative',
        }}
      >
        {token ? <HomeAuthorizedBtnGr /> : <HomeAuthenBtnGroup />}
      </Layout.Flex>
      <Content>
        {listUser &&
          <Table.TableForm
            content={listUser.content}
            totalElements={listUser.totalElements}
            isLoading={isLoading}
            size={listUser.size}
            getPage={getPage}
            handleUpdate={handleUpdate}
          />
        }
      </Content>
    </Container>
  )
})
