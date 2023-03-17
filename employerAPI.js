const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));

let employers = [
    {id: 1, name: 'First employer', department: "HR", salary: 20000 },
    {id: 2, name: 'Second employer', department: "Project Management", salary: 30000 },
    {id: 3, name: 'Third employer', department: "Web development", salary: 40000 },
];

// Method to get all employers data
app.get('/employers', function(req,res){
    res.send(employers);
});

// Method to add new employer to the data
app.post('/employers', function(req,res){
    let employer_data = req.body;
    employer_data.id = parseInt(employer_data.id);
    employer_data.salary = parseInt(employer_data.salary);
    employers.push(employer_data);
});

// Method to update an employers data
app.put('/employers/:employer_id', function(req,res){
    let employer_id = parseInt(req.params.employer_id);

    let employer_data = req.body;
    employer_data.id = parseInt(employer_data.id);
    employer_data.salary = parseInt(employer_data.salary);

    // Find the employer in the array
    let index = employers.findIndex(function(item){
        return item.id === employer_id;
    });

    // Update the employer record
    employers[index] = employer_data;

    res.send(employer_data);
});

// Method to delete an employer data

app.delete('/employers/:employee_id', function(req,res){
    let employee_id = parseInt(req.params.employee_id);

    // find the employer id in the array
    let index = employers.findIndex(function(item){
        return item.id === employee_id;
    });

    // check if employer exist
    if(index<0){
        res.status(500).send('employer not found');
    }

    // remove employer from the array
    let removedEmployer = employers.splice(index, 1);
    res.send(removedEmployer);
});

app.listen(3000, function(){
    console.log('Server is running on port 3000...');
});