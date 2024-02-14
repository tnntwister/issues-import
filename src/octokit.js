// octokit rest methods module
require('dotenv').config();
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

const createIssue = function(octokit, config, data, milestoneId) {
    octokit.rest.issues.create({
        owner: config.owner,
        repo: config.repo,
        title: data['Title'],
        body: data['Description'],
        labels: [data['Labels']],
        milestone: milestoneId,
    }).then(({ data }) => {
        console.log(data.title);
    }).catch((err) => {
        console.error(err);
    });
}   

// export createMilestone function
module.exports.createIssues = function(octokit, config, yamlData) {
    if (!Array.isArray(yamlData)) {
        console.log(yamlData);
        throw new Error('data should be an array');
    }
    yamlData.forEach(milestone => {
        // check if milestone exists with octokit
        octokit.rest.issues.listMilestones({
            owner: config.owner,
            repo: config.repo,
        }).then(({ data }) => {
            const ms = data.find(m => m.title === milestone['Milestone_Title']);
            if (ms) {
                // Milestone exists
                console.log('Milestone exists:', ms.title);
                if (Array.isArray(milestone['Milestone_Issues'])) {      
                    console.log(milestone['Milestone_Issues'].length);          
                    milestone['Milestone_Issues'].forEach(issue => {
                        createIssue(octokit, config, issue, data.id);                        
                    });
                }
            } else {
                // Milestone does not exist
                console.error('Milestone does not exist:');
                octokit.rest.issues.createMilestone({
                    owner: config.owner,
                    repo: config.repo,
                    title: milestone['Milestone_Title'],
                    state: 'open',
                    description: milestone['Milestone_Title'],
                }).then(({ data }) => {
                    if (Array.isArray(data['Milestone_Issues'])) {                
                        data['Milestone_Issues'].forEach(issue => {
                            createIssue(octokit, config, issue, data.id);                        
                        });
                    }           
                }).catch((err) => {
                    console.error(err);  
                });   
            }      
        });         
    });
}
