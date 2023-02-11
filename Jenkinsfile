pipeline {

    agent {
        docker {
            image 'node:18-bullseye-slim'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'ls /usr/share/app'
            }
        }
        /* stage('Build') { */
        /*     steps { */
        /*         sh 'npm install' */
        /*         sh 'npm run build' */
        /*     } */
        /* } */

        /* post { */
        /*     always { */
        /*         cleanWs() */
        /*     } */
        /* } */
    }
}
