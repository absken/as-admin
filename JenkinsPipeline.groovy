pipeline {
  agent { label 'master'}
  parameters {
    booleanParam(name: 'SCAN', defaultValue: true, description: 'Sonar scan branch')
    booleanParam(name: 'DEPLOY', defaultValue: false, description: 'Deploy to environment')
  }

  stages {
    stage('build-versions') {
      steps {
        withFolderProperties {
          sh '''
            bash ./bin/tools-version-capture.sh

          '''
        }
      }
    }

    stage('install-modules') {
      steps {
        sh '''
          npm run clean
          npm install
          npm run clean-packages
          npm run yarninstall

        '''
      }
    }
    stage('lint') {
      steps {
        sh '''
          npm run lint

        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npm run test

        '''
      }
    }
    stage('scan') {
      when {
        expression { params.SCAN == true }
      }
      steps {
        withFolderProperties {
          sh '''
            node ./bin/sonar-scan.js $GIT_BRANCH

          '''
        }
      }
    }
    stage('build') {
      steps {
        sh '''
          npm run build

        '''
      }
    }
    stage('deploy') {
      when {
        expression { params.DEPLOY == true }
      }
      steps {
        withFolderProperties {
          withAWS(role:"as-$ENVIRONMENT-cdk-deploy-assumed-role", roleAccount:"$CDK_ACCOUNT_ID", duration: 1800, roleSessionName: 'deploy-session') {
            sh '''
              echo 'Deploying...'
              echo 'Done!'
              '''
          }
        }
      }
    }
  }
  post {
    always {
      step([$class: 'CloverPublisher', cloverReportDir: 'coverage', cloverReportFileName: 'clover.xml'])
    }
  }
}
