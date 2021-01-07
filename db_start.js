const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async function start(){
  try {
    const db = await sqlite.open({
      driver: sqlite3.Database,
      filename: 'db.sqlite'
    });
    await db.migrate({force: true});

    // const cars = await db.all('select * from Car');
    // console.log(cars);

    // const faqs = await db.all('select * from FAQ');
    // console.log(faqs);
  } catch (error) {
    console.log(error);
  }
})();