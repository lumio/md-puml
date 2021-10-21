async function main() {
  console.log('Hello world!');
  throw new Error('This CLI is WIP.');
}

if (require.main === module) {
  main()
    .then(() => void process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
