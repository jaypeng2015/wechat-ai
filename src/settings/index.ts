import _ from 'lodash';
import settings from 'electron-settings';

export const syncContacts = contacts => {
  const localContacts = settings.get('contacts');
  settings.delete('contacts');
  const updated = _.reduce(
    contacts,
    (memo, contact) =>
      _.assign(memo, {
        [contact.UserName]: _.assign(contact, {
          autoReply: _.get(localContacts, `${contact.UserName}.autoReply`, false),
        }),
      }),
    {}
  );
  settings.set('contacts', updated);
};

export const getContacts = () => settings.get('contacts');
export const updateContact = contact => {
  settings.set(`contacts.${contact.UserName}`, contact);
};

export const getApiKey = () => settings.get('apiKey');

export const setApiKey = apiKey => settings.set('apiKey', apiKey);
