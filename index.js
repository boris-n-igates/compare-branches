
const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

  try {
    const token = core.getInput('github_token', {required: true});
    const base = core.getInput('base',{required: true});
    const head = core.getInput('head', {required: true});
  
    const context = github.context;
    const client = github.getOctokit(token);

    console.log('base ' + base);
    console.log('head ' + head);

    const [response, status] = await client.request('GET /repos/{owner}/{repo}/compare/{basehead}{?page,per_page}', {
      owner: context.repo.owner,
      repo: context.repo.repo,
      basehead: `{${base}}...{${head}}`
    })

    console.log('status ' + status);
    console.log("%j", response);
    
  } catch (error) {
    console.log('error ' + error);
    core.setFailed(error.message);
  }
}

run();

