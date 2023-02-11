pipeline {

    agent {
        docker {
            image 'node:18-bullseye-slim'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm run start'
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
