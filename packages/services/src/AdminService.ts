import { BaseService } from './BaseService'

export class AdminService extends BaseService {
  protected name: string = 'admin'

  public getAllUser<T=any>(page:any){
      return this.post<T>("",page)
  }
  public updateStatus<T=any>(userId:string){
      return this.put<T>(`/${userId}`)
  }
}