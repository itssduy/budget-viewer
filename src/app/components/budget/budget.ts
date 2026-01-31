import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup,  FormArray } from '@angular/forms';
import { GraphService } from '../../services/graphservice';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-budget',
  imports: [ReactiveFormsModule],
  templateUrl: './budget.html',
  styleUrl: './budget.css',
})

export class Budget {
  chartData: any
  logs: any[] = []

  constructor(private graphService: GraphService,  private cd: ChangeDetectorRef){

  }

  budgetForm = new FormGroup({
    totalBudget: new FormControl(0),
    type: new FormControl('month'),
    spendings: new FormArray([
      new FormGroup({amount: new FormControl(0)}),
    ])
  })

  get spendings(): any{
    return this.budgetForm.get("spendings") as FormArray
  }

  addSpending(): void{
    this.spendings.push(
      new FormGroup({
        amount: new FormControl(0)
      })
    )
    this.logs.push('hi')
  }

  onSubmit(e: Event): void{
    e.preventDefault()

    this.graphService.getChart(this.budgetForm.value).subscribe({
      next: (res: any)=>{
        this.chartData = URL.createObjectURL(res);
        this.cd.detectChanges();
      },
      error: (err: Error)=>{
        console.log(err)
      },
      complete: ()=>{
        console.log("chart loaded")
      }
    })
    //send to api

  }
}
