
const express = require('express');
const sql = require('mssql');
const app = express();
const PORT =  5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const ipAddress = require('./IP');


// const path = require('path')

const config = {
  user: 'meet',
  password: 'meet',
  server: 'DESKTOP-F4QVLAC\\SQLEXPRESS',
  database: 'workshop_system',
  options: {
    encrypt: false,
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);
pool.connect().then(() => {
  console.log('Connected to SQL Server database');
}).catch((err) => {
  console.error('Error connecting to SQL Server:', err);
});

// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect().then(console.log('connected'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// app.use(express.static(path.join(__dirname, '../client/build')));

// // Handle all routes by serving the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });


// ------------------------------ API -----------------------------------------------------

// Vehicle //
app.get('/vehicle', async (req, res) => {
  try{
    // const result = await pool.request().query('select * from vehicle');
    const query = `
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
      join vehicle_status on vehicle.vehicle_status = vehicle_status.status_id
    `;
    const result = await pool.request().query(query)
     
    res.json(result.recordset)
  } catch(err){
    console.log('error fetching data ',err)
  }
});

app.get('/vehicle/count', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as count from vehicle');
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }
});

app.get('/vehicle/pending/work', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as pendingWork from vehicle where vehicle_status in (2, 4);')
    res.json(result.recordset) 
  }catch(err){
    console.log('error fetching data',err)
  }
})

app.get('/vehicle/pending/delivery/count', async (req, res) => {
  try{
    const result = await pool.request().query('select count(*) as pendingDelivery from vehicle where vehicle_status = 1')
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }
})

app.get('/vehicle/pending/delivery', async (req,res) => {
  try {
    const query = `
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
      where vehicle_status = 1;
      `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  }catch(err){
    console.log('error fetching data',err)
  }

})

app.get('/vehicle/pending/getwork', async (req,res) => {
  try {
    const query = `      
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
      where vehicle_status in (2,4);
    `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  }catch(err) {
    console.log('error fetching data ', err);
  }
});

// customer //
app.get('/customer', async (req, res) => {
  try{
    const query = `
      select customer.customer_id,
        customer.customer_name,
        customer.contact,
        customer.Address,
        customer.email,
        customer_status.value as customerStatus,
        vehicle.registration_no,
        vehicle.vehicle_model
      from customer
      join vehicle on vehicle.customer_id = customer.customer_id
      join customer_status on customer.customer_status = customer_status.status_id;
    `;
    const result = await pool.request().query(query);
    res.json(result.recordset)
  } catch (err){
    console.log('error fetching data ',err)
  }
});

app.get('/customer/count', async(req,res) => {
  try{
    const result = await pool.request().query('select count(*) as count from customer')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});


// employee //
app.get('/employee', async (req, res) => {
  try {
    const result = await pool.request().query('select * from employee')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)
  }
});

app.get('/employee/count', async(req,res) => {
  try{
    const result = await pool.request().query('select count(*) as count from employee')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

// fetching employee detail in jobcard
// app.get('/jobcard/emp/data', async (req, res) => {
//   try {
//     // await pool.connect(config);
//     const { empid } = req.body;
//     const query = `
//       select emp_name, contact from employee where emp_id = 1 
//     `;
//     const result = await pool.request().query(query);
//     res.json(result.recordset);

//   } catch (err) {
//       console.log(err)
//   }
// })


// Stock //
app.get('/parts', async (req, res) => {
  try{
    const result = await pool.request().query('select * from parts')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/parts/totalStock', async (req, res) => {
  try{
    const result = await pool.request().query('select sum(units) as totalStock from parts')
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});


// jobcard //
app.get('/jobcard', async (req, res) => {
  try{
    const query = `
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
    `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/jobcard/count', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from jobcard')
    res.json(result.recordset)
  }catch(err) {
    console.log('error fetching data ',err)
  }
});


// payment //
app.get('/payment', async (req, res) => {
  try{
    const query = `
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
        `;
        // where payment.payment_status = 2;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/payment/pending', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as pendingPayment from payment where payment_status = 2;')
    res.json(result.recordset)
  }catch(err) {
    console.log('errror fetching data ',err)
  }
});


// feedback //
app.get('/feedback', async (req, res) => {
  try{
    const query = `
      select feedback.feedback_id,
        customer.customer_name,
        feedback.feedback,
        customer.email
      from feedback
      join customer on customer.customer_id = feedback.customer_id;
    `;
    const result = await pool.request().query(query)
    res.json(result.recordset)
  } catch(err) {
    console.log('error fetching data ',err)
  }
});

app.get('/feedback/count', async (req, res) => {
  try {
    const result = await pool.request().query('select count(*) as count from feedback')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)    
  }
});

// login //

app.get('/login', async (req, res) => {
  try {
    const result = await pool.request().query('select * from login')
    res.json(result.recordset)
  } catch (err) {
    console.log('error fetching data ', err)    
  }
});

app.get('/empid', async (req, res) => {
  try {
    const employee = `
      select * from employee
    `;
    const empResult = await pool.request().query(employee)
    res.json(empResult.recordset[0].emp_id)    
  } catch (err) {
    console.log(err)
  }
});


app.get('/search', async (req,res) => {

  try{
    const{ searchData } = req.body;

    const query = `
      select * from employee where designation = '${searchData}';
    `;
    const searchget = await pool.request().query(query)
    res.json(searchget.recordset)
  }
  catch(err){
   console.log(err)
  }
});


app.get('/paymentStatus', async (req, res) => {
  try {
    const invoiceStatusQuery = `
      select invoice_status as invoiceStatus from payment where invoice_status = 1;
    `;
    const invoiceStatusQueryResult = await pool.request().query(invoiceStatusQuery)
    res.json(invoiceStatusQueryResult.recordset)

  } catch (err) {
    console.log(err)
  }
});


app.get('/generatedInvoices', async(req, res) => {
  try{
    const generatedInvoices = `
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
    `;
    const generatedInvoicesResult = await pool.request().query(generatedInvoices)
    res.json(generatedInvoicesResult.recordset)

  }
  catch(err){
    console.log(err)
  }

})


app.get('/invoiceDetails', async (req,res) => {
  try {
    const invoiceNo = req.body;
  
    const num = Object.keys(invoiceNo);
    console.log(num)
    
    const invoiceDetailsQuery = `
      select * from [invoiceDetails]
      where invoice_no = '${invoiceNo}'
    `;
    const invoiceDetailsQueryResult = await pool.request().query(invoiceDetailsQuery);
    const invoiceDetailsResult = invoiceDetailsQueryResult.recordset;
    console.log(invoiceDetailsResult)
    res.send(invoiceDetailsQueryResult);
    
  } catch (err) {
    console.log(err)
  }
});


// const ipAddress = '172.30.240.1/';
// const ipAddress = '103.240.211.88';1

app.listen(PORT, ipAddress, () => {
  console.log(`Server running at http://${ipAddress}:${PORT}/`);
});
// app.listen(PORT,() =>{
//   console.log(`server is listening on ${PORT}`)
// })
