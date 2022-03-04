export interface IMenu {
  Name:string[],
  MenuID:string,
}

export interface IMenuCat{
  CatID:string,
  Name:string,
  Description:string,
  ProImg:string,
  ProName:string,
  Extras:[{Name:string,Price:number}], 
  Size:[{Name:string,Price:number}],
}
