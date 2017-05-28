const _ = require('lodash');
const settings = require('electron-settings');

module.exports.syncContacts = (contacts) => {
  const localContacts = settings.get('contacts');
  settings.delete('contacts');
  const updated = _.reduce(contacts, (memo, contact) => _.assign(memo, {
    [contact.UserName]: _.assign(contact, {
      autoReply: _.get(localContacts, `${contact.UserName}.autoReply`, false),
    }),
  }), {});
  settings.set('contacts', updated);
};

module.exports.getContacts = () => settings.get('contacts');

module.exports.updateContact = (contact) => {
  settings.set(`contacts.${contact.UserName}`, contact);
};
