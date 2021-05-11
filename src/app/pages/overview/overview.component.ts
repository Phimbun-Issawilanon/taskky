import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";
import { Subscription, interval } from 'rxjs';

@Component ({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    styleUrls: ['./overview.component.css'],
    
})
export class OverviewComponent {
    task;
    taskComplete;
    private updateSubscription: Subscription;
    
   constructor(public route: ActivatedRoute,
              public taskService: TaskService,
              public location: Location,
              public router: Router) {}

  ngOnInit() {
    this.task = this.taskService.getTasks();
    this.taskComplete = this.taskService.getTasksComplete();
  }
  completed(){
    this.router.navigate(['/complete' ]);
  }
  pending(){
    this.router.navigate(['/']);
  }

}
 