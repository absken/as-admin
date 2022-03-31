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
          sudo npm install -g yarn
          yarn run clean
          yarn install

        '''
      }
    }
    stage('lint') {
      steps {
        sh '''
          yarn run lint

        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          yarn run test

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
            echo 'Scanning...'

          '''
        }
      }
    }
    stage('build') {
      steps {
        sh '''
          yarn run build

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
