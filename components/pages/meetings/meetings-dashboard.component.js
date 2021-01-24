import {
  initializeDashboard
} from "./meetings-dashboard.js";


export const MeetingsDashboardComponent = {
  render: () => {
    initializeDashboard()

    return `
    <div class="overflow-hidden">

      <div id = "meetings-dashboard" class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4">
     
      </div>

    </div>
        `
  }
}

/*

TODO 
تحديد عدد الأعمدة حسب مقاس الصفحة

<div class="container">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>

*/