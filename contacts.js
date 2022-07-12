const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

const saveContacts = (name, email, noHp) => {
  const contact = { name, email, noHp };
  const contacts = loadContact();

  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate){
    console.log(chalk.red.inverse.bold('Contact already added, use another name'));
    return false;
  }

  if (email) {
    if(!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('Email is not valid'));
      return false;
    }
  }
  
  if(!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log(chalk.red.inverse.bold('Phone number is not valid'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts,null, 2))

  console.log(chalk.green.inverse.bold('Thanks bro'));
}

const listContact = ()=> {
  const contacts = loadContact();
  console.log(chalk.yellowBright.inverse.bold('Contact List'))
  contacts.forEach((contact, i) => {
    console.log(`${i+1}. ${contact.name} - ${contact.noHp}`)
  });
}

const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

  if(!contact) {
    console.log(chalk.red.inverse.bold(`${name} not found`));
    return false;
  }
  console.log(chalk.blue.inverse.bold(contact.name));
  console.log(chalk.blue.inverse.bold(contact.noHp));
  if(contact.email) {
    console.log(chalk.blue.inverse.bold(contact.email));
  }
}

const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.blue.inverse.bold(`${name} not found`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts,null, 2))

  console.log(chalk.green.inverse.bold(`${name} deleted successfully`));
}

module.exports = { listContact, saveContacts, detailContact, deleteContact};