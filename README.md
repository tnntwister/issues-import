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

