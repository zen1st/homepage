var React = require('react');
//var ReactDOM = require('react-dom');
//var NavBar = require("NavBar.js");
var skills1 = [{
		name: "PHP",
		category: "languages",
		description: "description",
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/500px-PHP-logo.svg.png"
	},
	{
		name: "Java",
		category: "languages",
		description: "description",
		src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/412px-Java_programming_language_logo.svg.png"
	},
	{
		name: "Python",
		category: "languages",
		description: "description",
		src: "https://aptonic.com/blog/wp-content/uploads/2015/08/python-logo.png"
	},
	{
		name: "Ruby",
		category: "languages",
		description: "description",
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ruby-logo-R.svg/1000px-Ruby-logo-R.svg.png"
	},
	{
		name: "C",
		category: "languages",
		description: "description",
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/The_C_Programming_Language_logo.svg/2000px-The_C_Programming_Language_logo.svg.png"
	},
	{
		name: "HTML5",
		category: "languages",
		description: "description",
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png"
	},
	{
		name: "CSS3",
		category: "languages",
		description: "description",
		src: "https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/042015/css3.png?itok=bzukaL4s"
	},
	{
		name: "SQL",
		category: "languages",
		description: "description",
		src: "https://www.electricmonk.nl/log/wp-content/uploads/2016/11/serveimage.png"
	},
	{
		name: "JavaScript",
		category: "languages",
		description: "description",
		src: "http://www.b2bweb.fr/wp-content/uploads/js-logo-badge-256.png"
	},
	{
		name: "Scala",
		category: "languages",
		description: "description",
		src: "http://gameover.co.in/wp-content/uploads/2015/04/scala-programming-language.jpg"
	},
	{
		name: "JavaScript",
		category: "languages",
		description: "description",
		src: "http://www.b2bweb.fr/wp-content/uploads/js-logo-badge-256.png"
	},
	{
		name: "Angular.JS",
		category: "libraries",
		description: "description",
		src: "https://code-maven.com/img/angularjs.png"
	},
	{
		name: "Spring",
		category: "libraries",
		description: "description",
		src: "http://www.javatpoint.com/images/spimages/spring1.png"
	},
	{
		name: "Struts",
		category: "libraries",
		description: "description",
		src: "http://www.sakhirecruiters.com/Images/Technologies/JAVASTRUTS.png"
	},
	{
		name: "iBATIS",
		category: "libraries",
		description: "description",
		src: "http://www.yiibai.com/uploads/allimg/140119/1-1401191T525531.png"
	},
	{
		name: "Bootstrap",
		category: "libraries",
		description: "description",
		src: "https://pkp.sfu.ca/wp-content/uploads/2016/09/bootstrap-logo.png"
	},
	{
		name: "Hadoop",
		category: "libraries",
		description: "description",
		src: "https://www.contegix.com/wp-content/uploads/2015/09/Hadoop.png"
	},
	{
		name: "W3.CSS",
		category: "libraries",
		description: "description",
		src: "http://www.soniseo.com/wp-content/uploads/2013/10/css-tutorial-website.jpg"
	},
	{
		name: "React.JS",
		category: "libraries",
		description: "description",
		src: "http://www.unixstickers.com/image/data/stickers/react/badge/React-JS.sh.png"
	},
	{
		name: "eclipse",
		category: "environments",
		description: "description",
		src: "https://www.eclipse.org/eclipse.org-common/themes/solstice/public/images/logo/eclipse-800x188.png"
	},
	{
		name: "Linux/Unix",
		category: "environments",
		description: "description",
		src: "http://www.extremetech.com/wp-content/uploads/2012/01/linux.jpg"
	},
	{
		name: "Windows",
		category: "environments",
		description: "description",
		src: "https://cu3.uicdn.net/c24/d6e7e1c9525f675a21eca61e5eae9/webapp/6169-windows.png"
	},
	{
		name: "Tomcat",
		category: "environments",
		description: "description",
		src: "https://aboutssl.org/wp-content/uploads/2015/11/logo-apache-tomcat.jpg"
	},
	{
		name: "WMWare Workstation",
		category: "environments",
		description: "description",
		src: "https://warezx.net/wp-content/uploads/2017/01/vmware.jpg"
	},
	{
		name: "Node.JS",
		category: "environments",
		description: "description",
		src: "http://www.skginfosolutions.com/images/node_js.png"
	},
	{
		name: "Github",
		category: "environments",
		description: "description",
		src: "http://www.aha.io/assets/integration_logos/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png"
	}];

var Child = React.createClass(
{
	handleChange: function (e) 
	{
		var name = e.target.value;
		this.props.onChange(name);
	},
	render: function () 
	{
		return(<select id="categoryNames" onChange={this.handleChange}>
				<option value="all">All </option>
				<option value="languages">Languages </option>
				<option value="libraries">Libraries/Framework </option>
				<option value="environments">Environments/Servers </option>
				</select>
			);
	}
});

var skills2 = [];
var skills2Html;

var Parent = React.createClass(
{
	getInitialState: function () 
	{
		return{cat: 'languages', currentPage:1, skillsPerPage:6};
		this.handleClick = this.handleClick.bind(this);
	},
	componentWillMount: function () 
	{
		for (i = 0; i < skills1.length; i++) 
		{
			skills2.push(skills1[i]);
		}
	},
	componentDidMount: function () 
	{
		$("#renderPageNumbers a:nth-child(1)").addClass("w3-green");
	},
	changeCat: function (newCat) 
	{
		skills2 = [];
		
		for (i = 0; i < skills1.length; i++) 
		{
			if(newCat === skills1[i]["category"] || newCat === "all")
			{
				skills2.push(skills1[i]);
			}
		}
		
		this.setState(
		{
			cat: newCat, currentPage: 1
		});
		
		$("#renderPageNumbers a").removeClass("w3-green");
		$("#renderPageNumbers a:nth-child(1)").addClass("w3-green");
	},
	handleClick: function(event) 
	{
		//alert(Number(event.target.id));
		this.setState({currentPage: Number(event.target.id)});
		$("#renderPageNumbers a").removeClass("w3-green");
		var id = Number(event.target.id);
		$("#renderPageNumbers a:nth-child(" + id + ")").addClass("w3-green");		
	},  
	render: function () 
	{	
	
		const {cat, currentPage, skillsPerPage} = this.state;

		// Logic for displaying current skills
		const indexOfLastSkill = currentPage * skillsPerPage;
		const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
		const currentSkills = skills2.slice(indexOfFirstSkill, indexOfLastSkill);

		/*
		const renderTodos = currentTodos.map((todo, index) => 
		{
			return <li key={index}>{todo}</li>;
		});
		*/
		
		skills2Html = currentSkills.map((skill2, index) => 
		{
			return (<div className="w3-third w3-container" key={index}>
						<div className="tParent">
						<img src={skill2.src} onClick={function(element){document.getElementById("img01").src = skill2.src;document.getElementById("modal01").style.display = "block"; var captionText = document.getElementById("caption"); captionText.innerHTML = skill2.name}} className="w3-hover-opacity thumbnail" />
						</div>
						<div className="w3-container w3-white">
							<p><b>{skill2.name}</b></p>
						</div>
					</div>
					);
		});

		// Logic for displaying page numbers
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(skills2.length / skillsPerPage); i++) 
		{
			pageNumbers.push(i);
        }
		
		const renderPageNumbers = pageNumbers.map(number => 
		{
			return(
				<a key={number} id={number} onClick={this.handleClick} className="w3-button">{number}</a>
			);
        });
		
		return(
			<div>
				<header className="w3-container" id="portfolio">
					<span className="w3-margin-right">Filter:</span>
					<Child name={this.state.name} onChange={this.changeCat}/>
				</header>
				
				<div className="w3-row-padding">{skills2Html}</div>
				<div className="w3-row-padding w3-center"><div id="renderPageNumbers" className="w3-bar">{renderPageNumbers}</div></div>
				
			</div>
			);
	}
});

ReactDOM.render(<Parent />,document.getElementById('reactApp'));

var style1 = {margin:'0 -16px 8px -16px'};

class EmailForm extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {subject: '', email: '', message: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) 
	{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({[name]: value});
	
		//this.setState({name:event.target.name, email:event.target.email, message: event.target.message});
	}

	handleSubmit(event) 
	{
		
		$.ajax
		({
			type: "post",
			url: "sendEmail.php",
			data:{subject : this.state.subject, email:this.state.email, message:this.state.message},
			success: function (data) 
			{
				alert(data);
			}
		});
		
		//alert('A name was submitted: ' + this.state.subject + " " + this.state.email + " " + this.state.message);
		event.preventDefault();
	}

	render() 
	{
		return (
		<form onSubmit={this.handleSubmit} target="_blank">

		<div className="w3-row-padding" style={style1}>
		<div className="w3-half">
		<input className="w3-input w3-border" type="text" placeholder="Subject" required name="subject" value={this.state.subject} onChange={this.handleChange}/>
		</div>

		<div className="w3-half">
		<input className="w3-input w3-border" type="text" placeholder="Your Email Address" required name="email" value={this.state.email} onChange={this.handleChange}/>
		</div>
		</div>

		<input className="w3-input w3-border" type="text" placeholder="Your Message" required name="message" value={this.state.message} onChange={this.handleChange}/>
		<button className="w3-btn w3-black w3-right w3-padding w3-section" type="submit">
		<i className="fa fa-paper-plane"></i> SEND MESSAGE
		</button>
		</form>
		);
	}
}

ReactDOM.render(<EmailForm />,  document.getElementById('emailForm'));