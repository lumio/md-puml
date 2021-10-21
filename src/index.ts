async function main() {
  console.log('Hello world!');
  console.log('This CLI is WIP');
}

if (require.main === module) {
  main()
    .then(() => void process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
