const puppeteer = require('puppeteer');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const check = async (groupName, itemNames) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www22.muenchen.de/fs/termin/index.php');
  await sleep(2000);

  const errorMessage = await page.$$eval(
    'h3',
    (headings, [groupName, itemNames]) => {
      try {
        const groupHeading = [...headings].find(h => h.textContent.includes(groupName));
        if (groupHeading) {
          groupHeading.click();
        } else {
          return 'Can\'t find group heading';
        }

        const links = [...groupHeading.parentElement.nextElementSibling.querySelectorAll('a')];
        const items = itemNames.map(itemName => {
          const item = links.find(link => link.textContent.includes(itemName));
          if (!item) return undefined;
          return item;
        });
        if (items.includes(undefined)) return 'Can\'t find item';

        items.forEach(item => {
          const select = item.parentElement.parentElement.querySelector('select');
          if (!select) throw new Error('Can\t find select');
          select.value = '1';
        })

        const submitButton = document.querySelector('.WEB_APPOINT_FORWARDBUTTON');
        if (!submitButton) throw new Error('Can\t find "Weiter" button');
        submitButton.click();
      } catch(e) {
        return e.message;
      }
    },
    [groupName, itemNames]
  );
  if (typeof errorMessage === 'string') throw new Error(errorMessage);

  await sleep(1000);
  const bookableDays = await page.$$('.nat_calendar.nat_calendar_weekday_bookable');
  const count = bookableDays.length;
  await browser.close();

  return count;
};

module.exports = { check };
