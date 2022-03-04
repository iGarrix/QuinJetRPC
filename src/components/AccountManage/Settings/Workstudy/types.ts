import * as Yup from 'yup';
export interface IWorkstudyForm {
    jobGeo: string,
    studyGeo: string,
    jobName: string,
    stydyName: string,
}
export interface IWorkstudyFormServer {
    findEmail: string,
    jobGeo: string,
    studyGeo: string,
    jobName: string,
    stydyName: string,
}

export const validateWorkstudy = Yup.object({
    jobGeo: Yup.string()
    .min(3, 'Required'),
    studyGeo: Yup.string()
    .min(3, 'Required'),
    jobName: Yup.string()
    .min(3, 'Required'),
    stydyName: Yup.string()
    .min(3, 'Required'),
})