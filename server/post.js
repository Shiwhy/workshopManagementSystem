const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const PORT =  5001;
const ipAddress = require('./IP');


const config = {
  user:"meet",
  password: "meet",
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: "workshop_system",                                                                                              
  options: {
    encrypt: false,
    trustedConnection: true,
    trustServerCertificate: true
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect().then(console.log('connected'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// login //

app.post('/login', async (req, res) => {
  try {
    await poolConnect;

    const { username, password } = req.body;

    const query = `
      select count(*) as count from signup where username='${username}' and password='${password}';
    `;
    const result = await pool.request().query(query);

    // authentication
    const user = result.recordset[0].count;
    if(user === 1){
      res.status(200).json({message: 'login succesfully'})
    }else{
      res.status(401).json({message: 'invalid username and password'})
    }

    // res.status(200).json({ message: 'Login successfully' });

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'error occurred while login' });
  }
});

app.post('/forgetPassword', async (req, res) => {
  await poolConnect;

  const { forgUsername, forgPassword } = req.body;

  const forgetPasswordQuery = `
    update signup
    set password = '${forgPassword}'
    where username = '${forgUsername}'
  `;
  await pool.request().query(forgetPasswordQuery);
  res.status(200).json({ message: 'Password Changed Successfully' })
});


app.post('/signup', async (req,res) => {
  try{
    await poolConnect;
    
    const { username, name, password, email } = req.body;

    // authentication             
    const check= `
      select * from signup where username = '${username}' and email = '${email}';
    `;
    const checkdata = await pool.request().query(check);
    if(checkdata.recordset.length>0) {
      return res.status(400).json({ error: 'user already exist' });
    }

    // insert after authentication success
    const insert = `insert into signup (name, username, password, email) values ('${name}', '${username}', '${password}', '${email}')`;
    await pool.request().query(insert);
    res.status(200).json({ message: 'signup successfull'});

  } catch(err) {
    res.status(500).json({ error: 'server error'});
    console.error(err);
  }
});

app.post('/jobcard', async (req,res) => {
  try{
    await poolConnect;

    const { 
      name, contact, email, address, custStatus, empid,
      vehType, fuel, company, model, plate, kms, vehicleStatus,serviceDate, 
      complains, reqService, compStatus, 
      paymentStatus, payDate, 
      parts, jobcardStatus,
    } = req.body;

    const customer = `
      insert into customer ( customer_name, contact, Address, email, customer_status )
      output inserted.customer_id
      values ( '${name}', '${contact}', '${address}', '${email}', '${custStatus}' );
    `;
    const customerResult = await pool.request().query(customer);
    const customer_id = customerResult.recordset[0].customer_id;
    
    const vehicle = `
      insert into vehicle ( vehicle_type, fuel_type, company, vehicle_model, registration_no, KMs, customer_id, vehicle_status ) 
      output inserted.vehicle_id
      values ( '${vehType}', '${fuel}', '${company}', '${model}', '${plate}', '${kms}', '${customer_id}','${vehicleStatus}' );
    `;
    const vehicleResult = await pool.request().query(vehicle);
    const vehicle_id = vehicleResult.recordset[0].vehicle_id;

    const estDate = `
      insert into estimate ( est_date ) 
      output inserted.est_id
      values( '${serviceDate}' );
    `;
    const estResult = await pool.request().query(estDate);
    const est_id = estResult.recordset[0].est_id;

    const complain = ` 
      insert into complains ( complain, complain_status, vehicle_id, requested_service, required_parts )
      output inserted.complain_id
      values ( '${complains}', '${compStatus}', '${vehicle_id}','${reqService}', '${parts}' );
    `;
    const complainResult = await pool.request().query(complain);
    const complain_id = complainResult.recordset[0].complain_id;

    const payment = `
      insert into payment ( payment_status, customer_id, vehicle_id, payment_date, invoice_status )
      output inserted.payment_id
      values ( '${paymentStatus}', '${customer_id}', '${vehicle_id}', '${payDate}', 2 );
    `;
    const paymentResult = await pool.request().query(payment);
    const payment_id = paymentResult.recordset[0].payment_id;

    const jobcard = `
      insert into jobcard (jobcard_date, jobcard_status, customer_id, employee_id, vehicle_id, complain_id, payment_id)
      output inserted.jobcard_id
      values( FORMAT (getdate(), 'dd-MM-yy'), '${jobcardStatus}', '${customer_id}', '${empid}', '${vehicle_id}', '${complain_id}', '${payment_id}')
    `;
    const jobcardResult = await pool.request().query(jobcard);
    const jobcard_id = jobcardResult.recordset[0].jobcard_id;


    // jobcrd_id into estimate table 
    const updateEst = `
      update estimate 
      set jobcard_id = '${jobcard_id}' 
      where est_id = '${est_id}'
    `;
    const updatedEstimate = await pool.request().query(updateEst);

    res.status(200).json({ message:'Jobcard added' })

  }catch(err){
    console.log(err)
  }
});

// app.post('/payment', async(req, res) => {
//   try{ 
//     await poolConnect;
//     const { invDescription, invQuantity, invUnitPrice, invAmount, invTotal } = req.body;

//     const invoiceQuery = `
//       insert into invoice ( description, qunatity, unit_price, amount, total )
//       values ( '${invDescription}', '${invQuantity}', '${invUnitPrice}', '${invAmount}', '${invTotal}' );
//     `;

//     await pool.request().query(invoiceQuery);

//   }catch(err){
//     console.log(err)
//   }
// });



// fetching employee data in jobcard
app.post('/jobcard/employee', async(req,res) => {
  try{
    await poolConnect;

    const { empid } = req.body; 

    const query = `
      select emp_name, contact from employee where emp_id = '${empid}';
    `;

    const result = await pool.request().query(query);

    const { emp_name, contact } = result.recordset[0];

    if (result.recordset[0]) {
      res.json({
        empName: emp_name,
        empContact: contact,
      });
      // res.status(200).json({ message: `Employee fetched.` })
    } else  {
      console.log(res.status);
      res.status(401).json({ message: `Employee doesn't exist.` })
    }

  }catch(err){
    console.log(err)
    return res.status(500).json({ message: `server error`})
  }
});



// add employee 
app.post('/addemp', async (req,res) => {
  await poolConnect;
  const { e_name, e_email, e_contact, e_address, e_salary, e_bank_acc, e_designation } = req.body;

  const query = `
    insert into employee ( emp_name, contact, address, salary, email, bank_acc, designation )
    values( '${e_name}', '${e_contact}', '${e_address}', '${e_salary}', '${e_email}', '${e_bank_acc}', '${e_designation}' );
  `;
  await pool.request().query(query)
  res.status(200).json({ message: 'Data Added Succesfully' });
});


//add part
app.post('/addpart', async (req,res) => {
  await poolConnect;
  const{ partname, partprice, partunit } = req.body;

  const query = `
    insert into parts ( part_name, price, units ) 
    values ('${partname}', ' ${partprice}', '${partunit}')
  `;
  await pool.request().query(query)
  res.status(200).json({ message: 'Data Added Succesfully' });

});

//add part units into databse
app.post('/addPartUnit', async(req, res) => {
  await poolConnect;
  const{ addUnit, partName } = req.body;

  // console.log(addUnit);
  // console.log(partName);

  const currentValue = `
    select units from parts
    where part_name = '${partName}'
  `;
  const value = await pool.request().query(currentValue);
  const existingValue = value.recordset[0].units

  const addUnitQuery = `
    update parts 
    set units = ${existingValue} + ${addUnit}
    where part_name = '${partName}'
  `;
  await pool.request().query(addUnitQuery)
  return res.status(200).json({message: 'part added'})
});


//searchbar
app.post('/search', async (req,res) => {
  try {
    
    await poolConnect;
    const{ searchEmp, searchVehicle, searchCustomer, searchJobcard, pendingdelivery, searchPart, searchPayment, searchPendingWork, searchInvoice } = req.body;
  
    
    if(searchEmp) {
      const query = `
        select * from employee where emp_name = '${searchEmp}' or designation='${searchEmp}' or contact='${searchEmp}' 
      `;
      const result = await pool.request().query(query)
      res.json(result.recordset);

    } 
    else if (searchVehicle) {
      const searchVehicleQuery = ` 
        select vehicle.*,
          customer.customer_name ,
          vehicle_company.company_name,
          fuel.fuel_name,
          vehicle_status.value
        from vehicle 
        join customer on customer.customer_id = vehicle.customer_id
        join vehicle_company on vehicle_company.company_id = vehicle.company
        join fuel on fuel.fuel_id = vehicle.fuel_type
        join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
        where registration_no ='${searchVehicle}' or customer_name='${searchVehicle}' or 
              vehicle_type = '${searchVehicle}' or company_name = '${searchVehicle}' or
              vehicle_model = '${searchVehicle}' or fuel_name = '${searchVehicle}' or
              vehicle_status.value = '${searchVehicle}' 
      `;
      const vehicleResult = await pool.request().query(searchVehicleQuery);
      res.json(vehicleResult.recordset)
    }
    else if (searchCustomer) {
      const searchCustomerQuery = `
        select customer.customer_name,
            customer.contact,
            customer.Address,
            customer.email,
            customer_status.value as customerStatus,
            vehicle.vehicle_model,
            vehicle_status.value,
            vehicle.registration_no
          from customer
          join vehicle on vehicle.customer_id = customer.customer_id
          join customer_status on customer_status.status_id = customer.customer_status
          join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
          where customer.customer_name = '${searchCustomer}' or contact = '${searchCustomer}' or
          email = '${searchCustomer}' or vehicle_model = '${searchCustomer}' or
          registration_no = '${searchCustomer}'
      `;
      const customerResult = await pool.request().query(searchCustomerQuery)
      res.json(customerResult.recordset)
    } 
    else if (searchJobcard) {
      const searchJobcardQuery = `
        select jobcard.jobcard_id,
          jobcard.jobcard_date, 
          jobcard_status.value as jobcardStatus,
          customer.customer_name,
          employee.emp_name,
          vehicle.vehicle_model,
          vehicle.registration_no,
          complains.complain,
          payment.amount,
          payment_status.value as paymentStatus,
          payment.invoice_name,
          payment.invoice_date,
          estimate.est_date
        from jobcard
        join jobcard_status on jobcard_status.status_id = jobcard.jobcard_status
        join customer on customer.customer_id = jobcard.customer_id
        join employee on employee.emp_id = jobcard.employee_id
        join vehicle on vehicle.vehicle_id = jobcard.vehicle_id
        join complains on complains.complain_id = jobcard.complain_id
        join payment on payment.payment_id = jobcard.payment_id
        join estimate on estimate.jobcard_id = jobcard.jobcard_id
        join payment_status on payment_status.status_id = payment.payment_status 
        where customer_name = '${searchJobcard}' or jobcard.jobcard_date = '${searchJobcard}' or
        jobcard_status.value = '${searchJobcard}' or vehicle.registration_no = '${searchJobcard}' or 
        payment_status.value = '${searchJobcard}' or vehicle.vehicle_model = '${searchJobcard}' or 
        employee.emp_name = '${searchJobcard}' or estimate.est_date = '${searchJobcard}' 
      `;
      const jobcardResult = await pool.request().query(searchJobcardQuery)
      res.json(jobcardResult.recordset)
    }
    else if (pendingdelivery) {
      const searchDeliveryquery = `
        select vehicle.vehicle_type,
            vehicle_company.company_name,
            vehicle.vehicle_model,
            customer.customer_name,
            vehicle.KMs,
            fuel.fuel_name,
            vehicle_status.value,
            vehicle.registration_no
        from vehicle
        join customer on customer.customer_id = vehicle.customer_id
        join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
        join vehicle_company on vehicle_company.company_id = vehicle.company
        join fuel on fuel.fuel_id = vehicle.fuel_type
        where vehicle.vehicle_model = '${pendingdelivery}' or vehicle.registration_no = '${pendingdelivery}' or
              customer.customer_name = '${pendingdelivery}' or vehicle_company.company_name = '${pendingdelivery}'
      `;
      const deliveryResult = await pool.request().query(searchDeliveryquery)
      res.json(deliveryResult.recordset)
    } 
    else if (searchPart) {
      const searchPartQuery = `
        select * from parts where part_name = '${searchPart}'
      `; 
      const searchPartQueryResult = await pool.request().query(searchPartQuery)
      console.log(searchPartQueryResult)
      res.json(searchPartQueryResult.recordset)
    }
    else if (searchPayment) {
      const searchPaymentQuery = `
        select payment.payment_id,
          payment_status.value as paymentStatus,
          payment.amount,
          customer.customer_name,
          customer.contact,
          vehicle.registration_no,
          vehicle.vehicle_model
        from payment
        join payment_status on payment_status.status_id = payment.payment_status
        join customer on customer.customer_id = payment.customer_id
        join vehicle on vehicle.vehicle_id = payment.vehicle_id 
        where payment_status.value = '${searchPayment}' or customer.customer_name = '${searchPayment}' or
              vehicle.registration_no = '${searchPayment}' ;
      `;
      const searchPaymentQueryResult = await pool.request().query(searchPaymentQuery);
      res.json(searchPaymentQueryResult.recordset)
    }
    else if (searchPendingWork) {
      const searchWorkQuery = `
        select vehicle.vehicle_id,
          vehicle.vehicle_type,
          vehicle_company.company_name,
          vehicle.vehicle_model,
          fuel.fuel_name,
          vehicle.registration_no,
          vehicle.KMs,
          customer.customer_name,
          vehicle_status.value
        from vehicle 
        join vehicle_company on vehicle.company = vehicle_company.company_id
        join fuel on vehicle.fuel_type = fuel.fuel_id
        join customer on vehicle.customer_id = customer.customer_id
        join vehicle_status on vehicle_status.status_id = vehicle.vehicle_status
        where vehicle_company.company_name = '${searchPendingWork}' or vehicle.vehicle_type = '${searchPendingWork}' or
              vehicle.vehicle_model = '${searchPendingWork}' or fuel.fuel_name = '${searchPendingWork}' or
              vehicle.registration_no = '${searchPendingWork}' or customer.customer_name = '${searchPendingWork}' or
              vehicle_status.value = '${searchPendingWork}' 
        and vehicle_status in (2,4);
      `;
      const searchWorkQueryResult = await pool.request().query(searchWorkQuery)
      res.json(searchWorkQueryResult.recordset)
    }
    else if (searchInvoice) {
      const searchInvoiceQuery = `
        select 
          payment.amount,
          payment_status.value as paymentStatus,
          payment.payment_date,
          payment.invoice_name,
          payment.invoice_no,
          payment.invoice_date,
          invoice_status.inv_value as invoiceStatus,
          customer.customer_name,
          vehicle.registration_no
        from payment
        join invoice_status on invoice_status.status_id = payment.invoice_status
        join payment_status on payment_status.status_id = payment.payment_status
        join customer on customer.customer_id = payment.customer_id
        join vehicle on vehicle.vehicle_id = payment.vehicle_id
        where payment_status.value = '${searchInvoice}' or customer.customer_name = '${searchInvoice}' 
        or payment.payment_date = '${searchInvoice}' or  invoice_status.inv_value = '${searchInvoice}'
      `;
      const searchInvoiceQueryResult = await pool.request().query(searchInvoiceQuery)
      res.json(searchInvoiceQueryResult.recordset)
    }

  } catch (err) {
    console.log(err)
    
  }
});


app.post('/payment3', async (req, res) => {
  await poolConnect;

  const {rows, total, invVehiclePlate, invDate, invCustomer } = req.body;

  const invnoDescQuery = `
    select max(invoice_no)+1 as invoice_no from invoiceDescription;
  `;
  
  const invnoDescQueryResult = await pool.request().query(invnoDescQuery);
  const invnoDescResult = invnoDescQueryResult.recordset[0].invoice_no;
  console.log('InvNO: ', invnoDescResult)

  for (const row of rows) {
    const invDescriptionQuery = `
      insert into invoiceDescription ( description, quantity, unit_Price, amount, total, invoice_no )
      VALUES ('${row.description}', '${row.quantity}', '${row.unit_price}', '${row.amount}', '${total}', '${invnoDescResult}');
    `;
    await pool.request().query(invDescriptionQuery);
  }

  const invVehicleIdQuery = `
    select vehicle_id from vehicle where registration_no = '${invVehiclePlate}';
  `;
  const invVehicleIdQueryResult = await pool.request().query(invVehicleIdQuery);
  const invVehicleIdResult = invVehicleIdQueryResult.recordset[0].vehicle_id;
  console.log('vehicleID: ', invVehicleIdResult);

  const updatePayment = `
    update payment
    set invoice_no = '${invnoDescResult}', invoice_date = '${invDate}', invoice_name = '${invCustomer}', amount = '${total}'
    where vehicle_id = '${invVehicleIdResult}'
  `;
  await pool.request().query(updatePayment);
  
  const paymentStatusUpdate = `
    update payment
    set payment_status = 1
    where vehicle_id = '${invVehicleIdResult}'
  `
  await pool.request().query(paymentStatusUpdate);

  const updateInvStatus = `
    update payment
    set invoice_status = 1
    where vehicle_id = '${invVehicleIdResult}'
  `
  await pool.request().query(updateInvStatus);

  res.status(200).json({ message: 'Invoice Added' });
  
});

app.post('/updateStatus', async(req, res) => {

  await poolConnect;

  const { updateWork, updatePayStatus, updateJobcardStatus, registrationNo, updateDeliveryStatus} = req.body;

  const vehicleIdQuery = `
    select vehicle_id from vehicle where registration_no = '${registrationNo}';
  `;
  const vehicleIdResult = await pool.request().query(vehicleIdQuery);
  const vehicleId = vehicleIdResult.recordset[0].vehicle_id
  console.log(vehicleId)

  if(updateWork){
    const updateWorkStatusQuery = `
      update vehicle
      set vehicle_status = ${updateWork}
      where vehicle_id = '${vehicleId}'
    `;
    await pool.request().query(updateWorkStatusQuery);
    return res.status(200).json({ message: 'status updated' })
  }
  else if(updatePayStatus) {
    const updatePayment = `
      update payment
      set payment_status = ${updatePayStatus}
      where vehicle_id = '${vehicleId}'
    `;
    await pool.request().query(updatePayment);
    return res.status(200).json({ message: 'status updated' })
  }
  else if(updateJobcardStatus) {
    const updateJobcardQuery = `
      update jobcard
      set jobcard_status = ${updateJobcardStatus}
      where vehicle_id = '${vehicleId}'
    `;
    await pool.request().query(updateJobcardQuery);
    return res.status(200).json({ message: 'status updated' })
  }
  else if(updateDeliveryStatus)
  {
    const updateDeliveryStatusQuery = `
      update vehicle 
      set vehicle_status = ${updateDeliveryStatus}
      where vehicle_id = '${vehicleId}';
    `;
    await pool.request().query(updateDeliveryStatusQuery);
    return res.status(200).json({ message: 'status updated' })

  }

});


app.post('/invoiceDetails', async (req,res) => {
  await poolConnect;

  const invoiceNo = req.body;
  const number = invoiceNo[0];
  // console.log(number)
    
  const invoiceDetailsQuery = `
    select * from invoiceDescription
    where invoice_no = '${invoiceNo}'
  `;
  const invoiceDetailsQueryResult = await pool.request().query(invoiceDetailsQuery);
  const invoiceDetailsResult = invoiceDetailsQueryResult.recordset;

  res.send(invoiceDetailsResult);
});

app.post('/invoiceSummary', async (req,res) => {
  await poolConnect;

  const invoiceNo = req.body;
  const number = invoiceNo[0];
  // console.log(number)
    
  const invoiceDetailsQuery = `
    select * from invoiceSummary
    where invoice_no = '${invoiceNo}'
  `;
  const invoiceDetailsQueryResult = await pool.request().query(invoiceDetailsQuery);
  const invoiceDetailsResult = invoiceDetailsQueryResult.recordset;



  res.send(invoiceDetailsResult);

  // const noQuery = `
  //   select distinct total from description
  //   where invoice_no = '${invoiceNo}'
  // `;
  // const noQueryResult = await pool.request().query(noQuery)
  // console.log(noQueryResult.recordset[0])
});

// add Feedback
app.post('/addfeedback', async (req, res) => {
  try {
    await poolConnect;

    const {customerEmail, feedback} = req.body;

    const custEmailQuery = `
      select customer_id from customer where email = '${customerEmail}'
    `;
    const custEmailQueryResult = await pool.request().query(custEmailQuery)
    const customerId = custEmailQueryResult.recordset[0].customer_id;


    const addFeedbackQuery = `
      insert into feedback ( customer_id, feedback, customer_email )
      values ( '${customerId}', '${feedback}', '${customerEmail}' );
    `;
    await pool.request().query(addFeedbackQuery)
    return res.status(200).json({ message: 'Feedback added' });
  } catch (err) {
    console.log(err)
  }
})




app.listen(PORT, ipAddress, () => {
  console.log(`Server running at http://${ipAddress}:${PORT}/`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
