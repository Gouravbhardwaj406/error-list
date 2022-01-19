import { MESSAGES,STATUS,TYPE,ACTIONS } from "./Constants";
export const projects = [];

export const validateInput = function (project) {
  let message = [];
  if (!project.description) {
    message.push(MESSAGES.BUG_DESCRIPTION_NOT_PROVIDED);
  } else if (!project.type) {
    message.push(MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else {
    message.push(MESSAGES.PROJECT_ADDED);
    return { isValid: true, message };
  }
  return { isValid: false, message };

};

export const addProject = function (project) {
    projects.push({ ...project, status: STATUS.INPROGRESS });
  };