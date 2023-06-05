const dataObj = {
  'Patch Management0': 'yes',
  'Patch Management1': 'no',
  'Vulnerability Management0': 'yes',
  'Vulnerability Management1': 'no',
  'Application Security0': 'yes',
  'Application Security1': 'no',
  submit: ''
}
// console.log(Object.entries(dataObj)); 
// console.log(Object.keys(dataObj)); 

const domains = [
  'Patch Management',
  'Vulnerability Management',
  'Application Security'
];

let scope = [];
let transform = []; 

const x = Object.entries(dataObj); 
domains.forEach( (el) => {
	x.forEach( (e) => {
		if (e[0].slice(0,-1) === el) {
			if (e[0].slice(-1) === '0') {
				scope.push([el,e[1]])
			} else if (e[0].slice(-1) === '1') {
				transform.push([el,e[1]]); 
			}
		}
	})
})
// console.log(scope);
// console.log(transform); 

const dealData = {
  customer: 'Rafale',
  deal_id: 'E123123',
  dealname: 'AppSec',
  email: 'c@c.com',
  username: 'Uber',
  sbdid: 'sp7j7z9d799s6ic',
  description: 'Rafael Deal',
  scope: '',
  notes: '',
  submit: ''
}

delete dealData.submit;
console.log(dealData); 
