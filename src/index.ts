import mdPuml from './lib/md-puml';

async function main() {
  await mdPuml({});
}

if (require.main === module) {
  main()
    .then(() => void process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
