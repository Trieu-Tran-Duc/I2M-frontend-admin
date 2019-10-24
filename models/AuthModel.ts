import { action, observable, reaction, runInAction } from 'mobx'
import { authService, adminService } from '@frontend/services'
import { KEYS, I2MResponse, PATHS } from '@frontend/constants'
import * as cookies from 'js-cookie'
import Router from 'next/router'
import { utils } from '@frontend/core'

export interface LoginInfo {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpInfo {
  category?: string[]
  password: string
  name: string
  email: string
}

export interface LoginData {
  accessToken: string
  tokenType: string
}

export interface ICategory {
  id: string
  name: string
}

interface IDataSource {
  content: IListUser[]
  last: boolean
  page: number
  size: number
  totalElements: number
  totalPages: number
}
interface IListUser {
  id: string
  email: string
  fullName: string
  categories: ICategory[]
  active: boolean
}

export class AuthModel {
  @observable tokenExpires: number = 1
  @observable token: string = cookies.get(KEYS.ACCESS_TOKEN)
  @observable sucess: boolean
  @observable message: string
  @observable dataSource: IDataSource
  @observable isLoading: boolean

  constructor() {
    reaction(
      () => ({ token: this.token, expires: this.tokenExpires }),
      ({ token, expires }) => {
        if (token) {
          cookies.set(KEYS.ACCESS_TOKEN, token, { expires })
        } else {
          cookies.remove(KEYS.ACCESS_TOKEN)
        }
      }
    )
  }

  @action
  async login(data: LoginInfo) {
    try {
      const response = await authService.login<LoginData>(data)

      const {
        data: { accessToken },
      } = response
      runInAction(() => {
        this.tokenExpires = data.rememberMe ? 30 : 1
        this.token = accessToken
      })
      utils.redirect(undefined, cookies.get(KEYS.REDIRECT_URI))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(
        'Cannot login. Please check your username and password.'
      )
    }
  }

  @action
  async signup(data: SignUpInfo) {
    try {
      await authService.signup<I2MResponse>(data)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @action
  logout() {
    this.token = null
    Router.push(PATHS.login)
  }

  @action
  setToken(token: string) {
    this.token = token
  }

  @action
  async getAllUser(pageIndex: number) {
    try {
      this.isLoading = true
      let page = new FormData()
      page.append("page", pageIndex.toString())
      const { data } = await adminService.getAllUser(page)
      runInAction(() => {
        this.dataSource = data
      })
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      return error
    }
  }

  @action
  async updateStatusUser(id: string,pageIndex:number) {
    try {
      this.isLoading = true
      await adminService.updateStatus(id)
      this.getAllUser(pageIndex)
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      return error
    }
  }

}
