
// const { writeAsk, saveContacts } = require('./contacts')

const yargs  = require("yargs");
const { saveContacts, listContact, detailContact, deleteContact} = require("./contacts");

yargs.command({
  command: 'add',
  describe: 'Add contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'email',
      demandOption: false,
      type: 'string'
    },
    noHp: {
      describe: 'No Hp',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    saveContacts(argv.name, argv.email, argv.noHp)
  }
}).demandCommand();

yargs.command({
  command: 'list',
  describe: 'Show contact list',
  handler() {
    listContact();
  }
})

yargs.command({
  command: 'detail',
  describe: 'Show detail contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.name);
  }
})

yargs.command({
  command: 'delete',
  describe: 'Delete contact',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.name);
  }
})



yargs.parse();
// const main = async()=> {
//   const nama = await writeAsk('Masukkan nama anda : ');
//   const email = await writeAsk('Masukkan email anda : ');
//   const noHp = await writeAsk('Masukkan No Hp anda : ');

//   saveContacts(nama, email, noHp);
// }

// main();