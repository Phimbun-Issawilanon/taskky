import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";
import { Subscription, interval } from 'rxjs';
import { DatePipe } from '@angular/common'


@Component ({
    selector: "Overview",
    templateUrl: "./task-complete.component.html",
    styleUrls: ['./task-complete.component.css'],
    
})
export class CompleteComponent {
    task;
    taskComplete;
    private updateSubscription: Subscription;
    
   constructor(public route: ActivatedRoute,
              public taskService: TaskService,
              public location: Location,
              public router: Router,
              public datepipe: DatePipe) {}

  ngOnInit() {
    this.task = this.taskService.getTasks();
    
    this.updateSubscription = interval(1000).subscribe(
      (val) => {this.taskComplete = this.taskService.getTasksComplete();}
  );
  }
  public convertDatetime(datetime: Date){
    let now = Date.now()
    let date_now = this.datepipe.transform(now, 'dd/MM/yyyy')
    let dueDate = this.datepipe.transform(datetime, 'dd/MM/yyyy h:mm a').split(" ")

    if (date_now == dueDate[0]){
        // duedate is today
        return this.formatString('Today, {0} {1}',dueDate[1],dueDate[2])
    }
    else {
        return this.formatString('{0}, {1} {2}',dueDate[0],dueDate[1],dueDate[2])
    }
}
formatString(str: string, ...val: string[]) {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}
  toDetail(id : number) {
    this.router.navigate(['/detail', id ]);
}

}
 