import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { DatePipe } from '@angular/common'
@Component ({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    styleUrls: ['./overview.component.css'],
    
})
export class OverviewComponent {
    index:any;
    task;
    tasks: Array<any>;
    taskComplete;
   day: any;
  taskNext: any;
    
   constructor(public route: ActivatedRoute,
              public taskService: TaskService,
              public router: Router,
              public datepipe: DatePipe, ) {}

  ngOnInit() {
    this.task = this.taskService.getTasks();
    this.taskComplete = this.taskService.getTasksComplete();
    let now = new Date(); 
    let nextWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(7 - now.getDay())); //วันอาทิตย์ที่จะถึง
    let nextWeekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(14 - now.getDay())); //วันเสาร์หน้า
    this.tasks=[]; //เก็บ Task ที่ต้องทำในสัปดาห์หน้า
    let last_id: number;
    this.tasks.length > 0 ? last_id=this.tasks[this.tasks.length-1].id : last_id=0
    for ( this.index in this.task) {
      this.taskNext = this.task.filter(x => x.id == this.index)[0]
      this.day = this.taskNext.due_date;
      /*ตรวจสอบวันของงานว่าอยู่ภายในสัปดาห์หน้าหรือไม่*/ 
      if(nextWeekStart <= this.day && this.day <= nextWeekEnd){
        this.tasks.push({
        'id': last_id+1,
        'name': this.taskNext.name,
        'detail': this.taskNext.detail,
        'due_date': this.taskNext.due_date,
        'photo': this.taskNext.photo
      });
    }
  }
  return this.tasks
  }

  toDetail(name : string) {
    let taskss = this.taskService.searchTasks(name)
    this.router.navigate(['/detail', taskss.id ]);
  }
  /*ไปหน้าcomplete task*/
  completed(){
    this.router.navigate(['/complete' ]);
  
  }
  /*ไปหน้าเเรก*/ 
  pending(){
    this.router.navigate(['/']);
  }

  public countdown(toDate : Date, id: number) {
    let now = new Date();
    let difference = toDate.getTime() - now.getTime(); // time difference in milliseconds

    let seconds = Math.trunc(difference / 1000);
    let mins = Math.trunc(seconds / 60); // differences in minutes
    let hours = Math.trunc(mins / 60);  // difference in hours
    let days = Math.trunc(hours / 24);  // difference in days

    let hour = hours % 24;
    let min  = mins % 60;
    
    if(toDate >= now){
        return this.formatString('Countdown : {0} {1} {2}', this.pluralize(days,'day'),
        this.pluralize(hour,'hour'),this.pluralize(min,'min'))
    }
    else{
        // overdue date
        try {
            this.taskService.setOverdue(id, true) 
        }
        finally {
            return this.formatString('Countdown : {0} {1} {2} overdue', this.pluralize(Math.abs(days),'day'),
            this.pluralize(Math.abs(hour),'hour'),this.pluralize(Math.abs(min),'min'))
        }
    }
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

/* check noun is plural or not */
pluralize(count, noun, suffix = 's'){
    return `${count} ${noun}${count !== 1 ? suffix : ''}`
}

formatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
}

}
 