import {
  MeetingCardComponent
} from "./meeting-card.component.js";

export const MeetingsDashboardComponent = {
  render: (meetingsArrayOfObjects = [{}, {}]) => {
    return `
    <style>
    </style>
    <div class="container overflow-hidden">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4">
        <div class="col">      <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">      <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">      <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">      <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">      <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>

    </div>
        `
  },
  renderLoading: () => {
    return `

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