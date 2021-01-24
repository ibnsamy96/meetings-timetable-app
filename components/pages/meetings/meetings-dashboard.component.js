import {
  initializeDashboard
} from "./meetings-dashboard.js";


export const MeetingsDashboardComponent = {
  render: () => {
    console.log('hi from comp');
    initializeDashboard()

    return `
    <div id = "meetingsDashboard" class="overflow-hidden pt-4 mt-4 pb-5">
    <h1 class="h2 mb-5 pageHeadingText">اجتماعات معًا القادمة</h1>

      <div id = "" class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-0 gy-4 mb-3">
     
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