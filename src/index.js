// index.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');
const readline = require('readline');
const okm = require('./octokit.js');

// récupérer les arguments
const args = process.argv.slice(2);
const filename = (args[0] != null) ? args[0] : 'project';

const configPath = path.join(__dirname, `../data/${filename}.yml`);
const currentData = yaml.load(fs.readFileSync(configPath, 'utf8'));

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    fetch: fetch,
  },
});

let owner = process.env.DEFAULT_GITHUB_USER;
let repo = process.env.DEFAULT_GITHUB_REPO;
let destination = 'issues';

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
            
            let currentConfig = {
                owner: owner,
                repo: repo,
                destination: destination
            };

            if (destination === 'issues') {
                okm.createIssues(octokit, currentConfig, currentData);
            }
            rl.close();
        });
    });
});

