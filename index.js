
const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

  try {
    const token = core.getInput('github_token', {required: true});
    const base = core.getInput('base',{required: true});
    const head = core.getInput('head', {required: true});
  
    const context = github.context;
    const client = github.getOctokit(token);
    const basehead = `${base}...${head}`

   const response = await client.request('GET /repos/{owner}/{repo}/compare/{basehead}{?page,per_page}', {
      owner: context.repo.owner,
      repo: context.repo.repo,
      basehead: basehead
    });

    if(response.status === 200){
      core.setOutput('head-status', response.data.status)
    }

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

