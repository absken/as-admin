import express from 'express';

import { getJsonFromFile, saveJsonContent } from '../utils';

const router = express.Router();

//routes
router.delete('/:id', deleteCustomer);

function deleteCustomer(req, res) {
  setTimeout(function() {
    let customers = getJsonFromFile('/data/customers.json');
    let filteredCustomers = customers.filter(customer => +customer.id !== +req.params.id);

    try {
      saveJsonContent('/data/customers.json', filteredCustomers);
    } catch(err) {
      console.error(err);
    }

    res.status(401).send('Not saved');
    return;

    res.json({
      status: "success",
      message: " "
    })
  }, 2000);
}

export default router;

