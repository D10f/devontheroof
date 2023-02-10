pipeline {

    agent {
        docker {
            image 'node:18-bullseye-slim'
            label 'docker'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        /* post { */
        /*     always { */
        /*         cleanWs() */
        /*     } */
        /* } */
    }
}
