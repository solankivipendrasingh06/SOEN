import projectModel from '../models/project.model';

export const createProject = async (name, userId) =>{
    if(!name || !userId) throw new Error('User is required');

    if(!userId) throw new Error('User is required');

    const project = await projectModel.create({
        name: name,
        users:[userId]
    });

    return project;
}