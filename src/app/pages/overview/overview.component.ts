import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";

@Component ({
    selector: "Overview",
    templateUrl: "./overview.component.html",
    
})
export class OverviewComponent {
    task;
    
   constructor(public route: ActivatedRoute,
              public taskService: TaskService,
              public location: Location,
              public router: Router) {}

  ngOnInit() {
    this.task = this.taskService.getTasks();
  }
}
 