pipeline {
    
    agent {
        any {
            label 'docker'
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    
     environment {
            CI = 'true'
            registry = 'sathvik04/'
            DOCKERHUB_CRED = credentials('dockerhub_id')
            registryCredential = 'dockerhub_id'
            dockerimage = ''
      }
    stages {
        stage('Git Pull') {
            steps {
                git url: 'https://github.com/sathvik-bhat/Wagging-Tails.git', branch: 'main',
                credentialsId: 'Credential_Git'
            }
        }
        
        stage('Deploy') {
            steps {
                // sh 'chmod 600 scientific-calculator.pem'
                ansiblePlaybook becomeUser: 'sathvik', colorized: true, disableHostKeyChecking: true, installation: 'ansible', inventory: 'inventory',
                playbook: 'playbook.yml', sudoUser: 'sathvik'
                // ansiblePlaybook credentialsId: 'localhost_ssh', disableHostKeyChecking: true, installation: 'ansible', inventory: 'inventory', playbook: 'playbook.yml'
                // sh 'ansible-playbook -i inventory playbook.yml --private-key key'
            }
        }
    }
}  