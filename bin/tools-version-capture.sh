#
CI_ENVIRONMENT=$ENVIRONMENT
CI_WORKER_HOSTNAME=`hostname -f`
CI_EXECUTOR=$EXECUTOR_NUMBER
CI_BUILD_ID=$BUILD_ID
BRANCH_ID=$GIT_BRANCH    # from Jenkins environment.  git branch --show-current does not work
COMMIT_ID=`git log | head -1`
NODE_VERSION=`node --version`
NPM_VERSION=`npm --version`

# Print out versions in a easy to find block in build log
#
echo
echo "##################################################################"
echo "######################  Build Versions  ##########################"
echo "##################################################################"
echo
echo "Environment:     [$ENVIRONMENT]"
echo
echo "Build Worker:    [Host: $CI_WORKER_HOSTNAME Executor: $CI_EXECUTOR Build Number: $CI_BUILD_ID]"
echo
echo "Branch (commit): [$BRANCH_ID ($COMMIT_ID)]"
echo
echo "nodejs:          [$NODE_VERSION]"
echo
echo "npm:             [$NPM_VERSION]"
echo
echo "##################################################################"