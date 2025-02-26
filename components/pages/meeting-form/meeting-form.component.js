import {
    getSharedComponentCode
} from "../../../components-manager.js";
import {
    initializeForm
} from "./meeting-form.js";
import {
    QuestionComponent
} from "../../shared/question.component.js";


export const MeetingFormComponent = {

    render: async function () {

        initializeForm()

        return `
        <section id='meeting-form-component' class="pt-4 mt-4 pb-5 row">
        <div class="col">
            <h1 class="h2 mb-5 pageHeadingText">أضف اجتماع</h1>
            <ol>

            

            </ol>
            <p id='warning-formNotCompleted' class = 'h6 d-none'>يجب اختيار إجابة واحدة على الأقل في كل سؤال!</p>
            <p id='warning-timeNotFormattedProperly' class = 'h6 d-none'>لم يتم كتابة الوقت بشكل صحيح!
            <br/>
            يجب أن يكون الوقت مكتوب على هيئة hours:minutes و حدود الدقائق هي [00-59] بينما حدود الساعات هي [00-23]
            </p>
            <p id='warning-dateNotFormattedProperly' class = 'h6 d-none'>لم يتم كتابة التاريخ بشكل صحيح!
            <br/>
            يجب أن تكون حدود اليوم [1-31] و حدود الشهر [1-12] و أن يكون العام ضمن القرن الواحد و العشرين
            </p>


            ${getSharedComponentCode('button',{btnData: {
                id: 'fireCheckMeetingForm',
                activationMethod: 'fireCheckMeetingForm()',
                content: "تأكّد من تفرّغ الأعضاء",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            }})}
            
            ${getSharedComponentCode('button',{btnData: {
                id: 'fireSubmitMeetingForm',
                activationMethod: 'fireSubmitMeetingForm()',
                content: "تم التأكّد/أضف الاجتماع",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto d-none',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            }})}
        </div>
        </section>
        `
    }
}

/*


${QuestionComponent.renderSelect({
                id : 'membersNames',
                isMultiple : 'true',
                questionContent : 'اختر أعضاء الفريق',
                choices : [
                    {id:'254311',content:'محمود سامي'},
                    {id:'254311',content:'محمد بسام'},
                    {id:'254311',content:'أحمد عادل'},
                    {id:'254311',content:'محمد النبراوي'}
                ]
            })}


*/

/*


           ${QuestionComponent.renderSelect({
                id : 'isFinal',
                isMultiple : 'false',
                questionContent : 'اختر نوع المعاد',
                choices : [
                    {id:'yes',content:'معاد نهائي'},
                    {id:'no',content:'معاد محتمل'}
                ]
            })}   

${QuestionComponent.renderSelect({
    id : 'branch',
    isMultiple : 'false',
    questionContent : 'اختر الفرع',
     choices : branches.map(branch=>{return {id:branch.branchCode,content:branch.branchName}})
})}           

${QuestionComponent.renderSelect({
    id : 'gam3a-Teams',
    isMultiple : 'false',
    questionContent : 'اختر الفريق',
    choices : [
        {id:'pr',content:'العلاقات العامة'},
        {id:'hr',content:'الموارد البشرية'},
        {id:'media',content:'الميديا'},
        {id:'ta3alom',content:'إيفنت التعلّم'},
        {id:'fr',content:'الموارد المالية'}
    ]
})}

${QuestionComponent.renderSelect({
    id : 'gam3a-ta3alom-subTeams',
    isMultiple : 'false',
    questionContent : 'اختر الفريق الفرعي',
    choices : [
        {id:'pr',content:'العلاقات العامة'},
        {id:'hr',content:'الموارد البشرية'},
        {id:'media',content:'الميديا'},
        {id:'fr',content:'الموارد المالية'}
    ]
})}

${QuestionComponent.renderDate({
    id : 'meetingDate',
    questionContent : 'ادخل التاريخ',
})}

${QuestionComponent.renderTime({
    id : 'meetingTime',
    questionContent : 'ادخل الوقت',
})}

*/