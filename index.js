const express = require('express');
const { redirect } = require('express/lib/response');

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
const app = express();
const PORT = 900;


app.set('view engine','hbs');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const addProject=[{
  title: 'Javascript Mobile - 2020',
  author: 'Ahmad Lutfi Afifi',
  date: '01 Jan 2020 - 10 Mar 2020',
  checkbox: [
    "fa-brands fa-html5",
    "fa-brands fa-react",
    "fa-brands fa-css3-alt",
    "fa-brands fa-js-square"
  ],
  duration: '3 bulan',
  content: 'App that used for Dumbways student, it was deployed and can downloaded on playstore. Happy download'
}];

app.get('/', (req, res) => {
  console.log(addProject);
  res.render('index',{addProject});
})

app.get('/project', (req, res) => {
  res.render('project');
})

app.post('/project',(req,res)=>{
  const data = req.body;
  addProject.push({
    title: data["project-name"],
    author:"Ahmad Lutfi Afifi",
    date: getFullTime(data["start-date"],data["end-date"]),
    checkbox:data["checkbox"],
    duration: difference(data["start-date"],data["end-date"]) ,
    content:data["description"]
  });
  res.redirect('/');
})

app.get('/project/edit/:id',(req,res)=>{
  res.render('project',{edit:addProject[req.params.id],id:req.params.id});
})

app.post('/project/update/:id',(req,res)=>{
  const data = req.body;
  addProject[req.params.id]={  
    title: data["project-name"],
    author:"Ahmad Lutfi Afifi",
    date: getFullTime(data["start-date"],data["end-date"]),
    checkbox:data["checkbox"],
    duration: difference(data["start-date"],data["end-date"]) ,
    content:data["description"]
   };
   res.redirect('/');     
  });
  

app.get('/project/delete/:id',(req,res)=>{
  addProject.splice(req.params.id,1);;
  res.redirect('/');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/project-detail/:index', (req, res) => {
  const index = req.params.index;
  const project = addProject[index];

  res.render('project-detail',{data: index, project});
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

function difference(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    day = 1000*60*60*24;
    dif =(date2utc - date1utc)/day;
  return dif < 30 ? dif +" hari" : parseInt(dif/30)+" bulan"
}

function getFullTime(dateStart,dateEnd){
  dateStart= new Date(dateStart);
  dateEnd = new Date(dateEnd);
  return `${dateStart.getDate()} ${month[dateStart.getMonth()]} ${dateStart.getFullYear()} - ${dateEnd.getDate()} ${month[dateEnd.getMonth()]} ${dateEnd.getFullYear()}`;
}