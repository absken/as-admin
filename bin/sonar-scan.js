#!node
const scanner = require('sonarqube-scanner');

const branchName = process.argv[2];

scanner(
  {
    serverUrl: 'https://sonarqube.absencesoft.io',
    token: 'a6b49d580622c1211ea8c5136d5ee5e9dcdd3813',
    options: {
      'sonar.projectKey': 'as.admin',
      'sonar.projectName': 'as.admin',
      'sonar.projectDescription': 'as admin javascript/typscript',
      'sonar.sources': 'src',
      'sonar.exclusions': 'node_modules/**, mock_server/**, build/**, bin/**, **/__tests__/**',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.branch.name': branchName,
    },
  },
  () => process.exit()
);
