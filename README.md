# issues-import

## Installation

To install and configure this project, follow these steps:

1. Clone the repository: `git clone https://github.com/tnntwister/issues-import.git`
2. Navigate to the project directory: `cd issues-import`
3. Install the required dependencies: `npm install`
4. Configure the project settings:  
    - rename the file `.env.example` into `.env`.
    - Go get a personal access token on Github > Settings > Developer Settings
    - 
5. Run the project: `node src/index.js <filename>`, where filename is the filename of your yaml data saved into /data/  
    - for instance, `node src/index.js my-project` will work with the file /data/my-project.yml
    - you can rename project.yml.example into project.yml if you want a template to start with.
    - i advise you adding destination (issue or wiki) in the filename, easier to manage a lot of files.   

That's it! You have successfully installed and configured the issues-import project. You can now start using it to import a list of issues from a YAML file into a GitHub project.

## Use

### Issues import

1. create a yml file (you can use IA to do that)

```yaml
-
    Title: Analyse des Feedbacks et Iterations
    Description: "'- Analyser les feedbacks recueillis pendant la phase de test bêta, en identifiant les tendances, les problèmes récurrents, et les opportunités d'amélioration.\n- Planifier et implémenter les ajustements et les corrections nécessaires basés sur les feedbacks des testeurs pour améliorer la qualité et l'expérience utilisateur du bot."
    Author Username: tnntwister
    Milestone: Phase de test bêta avec des utilisateurs réels sur des serveurs Discord sélectionnés
    Labels: documentation
-
    Title: Communication des Résultats et des Prochaines Étapes
    Description: "'- [ ] Communiquer les résultats de la phase de test bêta aux parties prenantes et aux testeurs impliqués.\n- [ ] Fournir une feuille de route claire pour les prochaines étapes du projet, y compris les fonctionnalités à venir et les dates de déploiement prévues."
    Author Username: tnntwister
    Milestone: Phase de test bêta avec des utilisateurs réels sur des serveurs Discord sélectionnés
    Labels: documentation
```

2. configure a github personal token with the good rights for your needs (for instance, writing issues if you want to import issues)

3. change default data in .env file if needed.

4. launch the script with the command `node src/index.js <filename>`


### Wiki import

1. create a yml file (you can use IA to do that)

```yaml
-
    Title: Analyse des Feedbacks et Iterations
    Description: "'- Analyser les feedbacks recueillis pendant la phase de test bêta, en identifiant les tendances, les problèmes récurrents, et les opportunités d'amélioration.\n- Planifier et implémenter les ajustements et les corrections nécessaires basés sur les feedbacks des testeurs pour améliorer la qualité et l'expérience utilisateur du bot."
    Author Username: tnntwister
    Milestone: Phase de test bêta avec des utilisateurs réels sur des serveurs Discord sélectionnés
    Labels: documentation
-
    Title: Communication des Résultats et des Prochaines Étapes
    Description: "'- [ ] Communiquer les résultats de la phase de test bêta aux parties prenantes et aux testeurs impliqués.\n- [ ] Fournir une feuille de route claire pour les prochaines étapes du projet, y compris les fonctionnalités à venir et les dates de déploiement prévues."
    Author Username: tnntwister
    Milestone: Phase de test bêta avec des utilisateurs réels sur des serveurs Discord sélectionnés
    Labels: documentation
```

2. configure a github personal token with the good rights for your needs (for instance, writing issues if you want to import issues)

3. change default data in .env file if needed.

4. launch the script with the command `node src/index.js <filename>`

