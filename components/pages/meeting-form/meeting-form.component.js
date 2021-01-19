import {
    QuestionComponent
} from "./question.component.js";

import {
    getSharedComponentCode
} from "../../../components-manager.js";

export const MeetingFormComponent = {
    render: () => {
        return `
        <section id='meeting-form-component' class="pt-2 row">
        <div class="col">
            <h1 class="h2 mb-3 pageHeadingText">أضف اجتماع</h1>
            <ol>

            ${QuestionComponent.render({
                id : 'branchName',
                isMultiple : 'false',
                questionContent : 'اختر الفرع',
                choices : [
                    {id:'gam3a',content:'الجامعة'},
                    {id:'tebb',content:'طب'},
                    {id:'handsa',content:'هندسة'},
                    {id:'tarbia',content:'تربية'},
                    {id:'tgara',content:'تجارة'},
                    {id:'asnan',content:'أسنان'}
                ]
            })}           

            ${QuestionComponent.render({
                id : 'teamName',
                isMultiple : 'false',
                questionContent : 'اختر الفريق',
                choices : [
                    {id:'pr',content:'العلاقات العامة'},
                    {id:'hr',content:'الموارد البشرية'},
                    {id:'media',content:'الميديا'},
                    {id:'fr',content:'الموارد المالية'}
                ]
            })}

            ${QuestionComponent.render({
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
            </ol>
            <p id='warning' class = 'h6 d-none'>يجب اختيار إجابة واحدة على الأقل في كل سؤال!</p>
            

            ${getSharedComponentCode('button', {
                id: 'checkMeetingForm',
                activationMethod: 'checkMeetingForm()',
                content: "تأكّد من تفرّغ الأعضاء",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            })}
            
            ${getSharedComponentCode('button', {
                id: 'submitMeetingForm',
                activationMethod: 'submitMeetingForm()',
                content: "تم التأكّد/أضف الاجتماع",
                buttonColorClass: 'btn-primary',
                buttonClasses:'h4 fw-normal me-auto d-none',
                spanClasses:"",
                buttonStyle: '',
                spanStyle: ''
            })}
        </div>
        </section>
        `
    }
}