// index.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');
const readline = require('readline');

// récupérer les arguments
const args = process.argv.slice(2);
const filename = (args[0] != null) ? args[0] : 'project';

const configPath = path.join(__dirname, `../data/${filename}.yml`);
const currentConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
console.log(currentConfig[0]);


const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    fetch: fetch,
  },
});

let owner = process.env.DEFAULT_GITHUB_USER;
let repo = process.env.DEFAULT_GITHUB_REPO;
let destination = 'issues';

// create milestone and issue with octokit
/*octokit.rest.issues.createMilestone({
    owner: 'tnntwister',
    repo: 'issues-import',
    title: 'Milestone title',
    state: 'open',
    description: 'Milestone description',
}).then(({ data }) => {
    console.log(data.id);
}).catch((err) => {
    console.error(err);
});*/
/*
octokit.rest.issues.create({
    owner: 'tnntwister',
    repo: 'issues-import',
    title: 'Issue title',
    body: 'Issue description',
    labels: ['documentation'],
    milestone: 1,
}).then(({ data }) => {
    console.log(data.title);
}).catch((err) => {
    console.error(err);
});
*/


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Quel utilisateur Github est concerné (${owner}) ? `, (answer) => {
    let name = answer;
    if (answer === '') {
        name = owner;
    } else {
        owner = name;
    }
    console.log(`Bonjour, ${name}!`);

    rl.question(`Sur quel dépôt voulez-vous importer des données (${repo}) ? `, (answer) => {
        let directory = answer;
        if (answer === '') {
            directory = repo;
        } else {
            repo = directory;
        }
        console.log(`Le dépôt de travail est : ${directory}`);
        rl.question(`Quelle destination choisissez-vous pour l'import (issues/wiki) ? `, (answer) => {
            if (answer === 'wiki') {
                destination = 'wiki';
            } else {
                destination = 'issues';
            }
            console.log(`Nous allons importer des données dans : ${destination}`);
            rl.close();
        });
    });
});

