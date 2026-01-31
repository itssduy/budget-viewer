import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor (private http: HttpClient){

  }

  getChart(data: any): Observable<any>{
    console.log(data)
    let chartType: string = 'p3'
    let chartSize: string = '700x200'
    let chartData: any = this.formatChartData(data.totalBudget, data.spendings)
    console.log(chartData)
    const url: string = `https://image-charts.com/chart?cht=${chartType}&chs=${chartSize}&chd=t:${chartData}`


    return this.http.get(url, {responseType: 'blob'})
    
  }

  formatChartData(totalBudget: number, spendings: any[]){
    let remainingBudget = 100
    let budgetData: any = []
    for (let spending of spendings){
      remainingBudget -= (spending.amount/totalBudget)* 100
      budgetData.push((spending.amount/totalBudget)* 100)
    }
    if( remainingBudget >= 0){ 
      budgetData.push((remainingBudget/totalBudget) * 100)
    }
    return budgetData.join(",")
    
  }
}
