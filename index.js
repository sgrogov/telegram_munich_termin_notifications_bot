const { check } = require('./browser');
const { start } = require('./bot');

const groupName = 'Umschreibung eines ausländischen Führerscheins';
const itemNames = ['Umschreibung eines ausländischen Führerscheins (kein EU/EWR-Führerschein) beantragen'];

// const groupName = 'Ortskundeprüfung';
// const itemNames = ['Anmeldung und Vereinbarung Prüftermin'];

start(async () => {
  const count = await check(groupName, itemNames);
  if (count === 0) {
    console.log('no dates for appointment');
    return null;
  }
  return `There are ${count} bookable dates!`;
});
