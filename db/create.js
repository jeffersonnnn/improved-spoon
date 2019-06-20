import pool from './pool'

/**
 * Create users table
 */
const createUsersTable = () => {
  const queryText = 
    `
    CREATE TABLE IF NOT EXISTS 
      users(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        email VARCHAR(30) UNIQUE NOT NULL,
        firstname VARCHAR (40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        password VARCHAR(128) NOT NULL,
        address VARCHAR(40),
        role INTEGER DEFAULT 0
    )`;
    return pool.connect().then(client => {
      return client.query(queryText)
    .then((res) => {
      console.log(res.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
    })
  
}



/**
* Create create cars table
*/


const createCarsTable = () => {
  const queryText = 
    `
    CREATE TABLE IF NOT EXISTS 
      cars(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        owner UUID,
        FOREIGN KEY (owner) REFERENCES users(id),
        created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
        state VARCHAR (40) NOT NULL,
        status VARCHAR (40) NOT NULL,
        price VARCHAR(14) NOT NULL,
        manufacturer VARCHAR(40) NOT NULL,
        model VARCHAR(14) NOT NULL,
        body_type VARCHAR (40) NOT NULL
    )`;

    return pool.connect().then(client => {
      return client.query(queryText)
    .then((res) => {
      console.log(res.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
    })
  
}
/**
* Create Order Table
*/

const createOrdersTable = () => {
  const queryText = 
  `
  CREATE TABLE IF NOT EXISTS 
      orders(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        buyer_id UUID,
        car_id UUID,
        amount VARCHAR(14) NOT NULL,
        status VARCHAR(13) DEFAULT 'pending', 
        FOREIGN KEY (buyer_id) REFERENCES users(id),
        FOREIGN KEY (car_id) REFERENCES cars(id)
    )`;

    return pool.connect().then(client => {
      return client.query(queryText)
    .then((res) => {
      console.log(res.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
    })
  
}


/**
* Create create flags table
*/


const createFlagsTable = () => {
  const queryText = 
    `
    CREATE TABLE IF NOT EXISTS 
      flags(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        car_id UUID,
        FOREIGN KEY (car_id) REFERENCES cars(id),
        created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
        reason VARCHAR(40) NOT NULL,
        description VARCHAR(40) NOT NULL
    )`;

    return pool.connect().then(client => {
      return client.query(queryText)
    .then((res) => {
      console.log(res.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
    })
  
}

(async() => {
  await createUsersTable()
  await createCarsTable()
  await createOrdersTable()
  await createFlagsTable()
})()


