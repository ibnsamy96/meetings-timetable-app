export const MeetingFormComponent = {
    render: () => {
        return `
        <section id='meeting-form-component' class="pt-2 row">
        <div class="col">
            <h1 class="h2 mb-3 pageHeadingText">أضف اجتماع</h1>
            <ol>
                <li id='q1' data-multiple=true class="h4 my-4">
                    <p class="m-0"> اختر نوع المعاد </p>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                </li>
                <li id='q2' data-multiple=false class="h4 my-4">
                    <p class="m-0"> اختر الفرع </p>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                     onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                     onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                </li>
                <li id='q3' data-multiple=false class="h4 my-4">
                    <p class="m-0"> اختار الفريق </p>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                    <div class="h5 fw-normal choice choiceSelected secondaryBoxShadow  mt-2 btn btn-info"
                        onclick="chooseThisChoice(this)"> اختارني أنا ! </div>
                </li>
            </ol>
            <p id='warning' class = 'h6 d-none'>يجب اختيار إجابة واحدة على الأقل في كل سؤال!</p>
            <div class="h4 fw-normal choice choiceSelected secondaryBoxShadow me-auto mt-2 btn btn-primary" onclick="submitForm()"> حفظ </div>
        </div>
        </section>
        `
    }
}