import actionConnect from '../assets/action_connect.png';
import actionRest from '../assets/action_rest.png';
import actionStudy from '../assets/action_study.png';
import actionWork from '../assets/action_work.png';
import bgOffice from '../assets/bg_office.png';
import eventLegacyCode from '../assets/event_legacy_code.png';
import actionJobChange from '../assets/action_job_change.png';
import actionSnsPost from '../assets/action_sns_post.png';

export const IMAGES = {
    action_connect: actionConnect,
    action_rest: actionRest,
    action_study: actionStudy,
    action_work: actionWork,
    bg_office: bgOffice,
    event_legacy_code: eventLegacyCode,
    action_job_change: actionJobChange,
    action_sns_post: actionSnsPost,
};

export type ImageKey = keyof typeof IMAGES;
