const dayjs = require('dayjs');
const getHeadlines = require('./utils/getHeadlines');
const issue = require('./utils/issue');

// run every first day of month at 00:01 UTC
const run = async (date) => {
  const contents = await getHeadlines(date);
  console.log(contents.length);
  const res = await issue.open({
    owner: 'headllines',
    repo: 'hackernews-monthly',
    title: `Hacker News Monthly Top 10 @${new Date(date).toISOString().slice(0, 10)}`,
    body: contents
  });
  const issueNumber = res.data.number;

  await issue.lock({
    owner: 'headllines',
    repo: 'hackernews-monthly', 
    issueNumber,
  });
}

run(new Date())
  .catch(err => {throw err});


// const sleep = () => new Promise(res => setTimeout(res, 2000));

// (async function() {
//   await run('2020-01-01')
//   await sleep();
//   await run('2020-02-01')
//   await sleep();
//   await run('2020-03-01')
//   await sleep();
//   await run('2020-04-01')
//   await sleep();
//   await run('2020-05-01')
//   await sleep();
//   await run('2020-06-01')
//   await sleep();
//   await run('2020-07-01')
//   await sleep();
//   await run('2020-08-01')
// })()


