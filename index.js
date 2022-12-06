
const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

  try {
    const token = core.getInput('github_token');
    const base = core.getInput('base');
    const head = core.getInput('head');
  
    const context = github.context;
    const client = github.getOctokit(token);

    const [response, status] = await client.request('GET /repos/{owner}/{repo}/compare/{basehead}{?page,per_page}', {
      owner: context.repo.owner,
      repo: context.repo.repo,
      basehead: `${base}...${head}`
    })

    console.log('status ' + status);
    console.log("%j", response);
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

