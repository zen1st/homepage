class CategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class Thumbnail extends React.Component {
  render() {
    const content = this.props.content;
	/*
	var overlay;
	if(content.demoUrl!=null)
	{
		overlay += <div className="overlay">;
		overlay += <div className="hover-content">;
		
	}*/

    return (
    <div className="w3-third w3-container w3-margin-bottom">
	
	<div className="w3-display-container">
      <img src={content.imgUrl} className="thumbnail"/>
	  
	  <div className="overlay">
    	<div className="hover-content">
		Content
        </div>
  	  </div>
	  
	</div>
	<div className="w3-container w3-white w3-center"><p><b>{content.name}</b></p></div>
    </div>
    );
  }
}

class Gallery extends React.Component {
	
	handleLengthChange(data) {
		//console.log(data);
		this.props.length(data);
	}
	
  render() {

    const filterText = this.props.filterText.toLowerCase();
    const cat = this.props.cat;

    const thumbnails = [];
    let lastCategory = null;

    this.props.contents.forEach((content) => {
      if (content.name.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      if (cat!=content.cat && cat!="all") {
        return;
      }
	  
      thumbnails.push(
        <Thumbnail
          content={content}
          key={content.name}
        />
      );
	  
      lastCategory = content.category;
    });

	// Logic for displaying current skills
	const lastIndex = this.props.currentPage * this.props.itemPerPage;
	const firstIndex = lastIndex - this.props.itemPerPage;
	const newThumbnails = thumbnails.slice(firstIndex, lastIndex);
		
    return (
	<div className="w3-row-padding" onChange={this.handleLengthChange(thumbnails.length)}>{newThumbnails}</div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value.toLowerCase());
  }
  
  handleCatChange(data) {
	//console.log(data);
    this.props.onCatChange(data);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
		  className="w3-input"
        />
        <p>
		<Selection contents={this.props.contents} onCatChange={this.handleCatChange}/>
        </p>
      </form>
    );
  }
}

class Selection extends React.Component
{
	
	constructor(props) 
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount()
	{
		this.props.onCatChange("all");
	}
	
	handleChange(e) 
	{
		this.props.onCatChange(e.target.value);
		//console.log(e.target.value);
	}
  
	render()
	{
		const uniqueCatData = [...new Set(this.props.contents.map(content => content.cat))];
		
		//console.log(uniqueCatData);
	
		var catCheckboxes = uniqueCatData.map((cat, index) => 
		{
			return(<option value={cat}>{cat} </option>);
		});
		
		return (<span><span>Category Filter: </span>
				<select id="categoryNames" onChange={this.handleChange}> 
				<option value="all">All </option>
				{catCheckboxes} </select> </span>);
	}
}

class Pagination extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {currentPage:1, itemPerPage:6, cat:"all"};
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.props.currentPage(this.state.currentPage);
		this.props.itemPerPage(this.state.itemPerPage);
	}
	
	componentWillReceiveProps(data)
	{
		if(data.cat != this.state.cat)
		{
			this.setState({currentPage:1, cat:data.cat});
		}
	}
	
	handleClick(event) 
	{
		this.setState({currentPage: Number(event.target.id)});
		$("#pagination a").removeClass("w3-green");
		var id = Number(event.target.id);
		$("#pagination a:nth-child(" + id + ")").addClass("w3-green");	
		this.props.currentPage(Number(event.target.id));
	}
	
	render() 
	{
		const {currentPage, itemPerPage} = this.state;
		
		// Logic for displaying page number
		const pageNumber = [];
		for (let i = 1; i <= Math.ceil(this.props.length / itemPerPage); i++) 
		{
			pageNumber.push(i);
		}
	
		const pagination = pageNumber.map(number => 
		{
			if(number == this.state.currentPage)
			{
				return(<a key={number} id={number} onClick={this.handleClick} className="w3-button w3-green number">{number}</a>);
			}
			else
			{
				return(<a key={number} id={number} onClick={this.handleClick} className="w3-button number">{number}</a>);	
			}
        });

		return (<div id="pagination" className="w3-bar w3-center"> 
				{pagination}  
				</div>);
	}
}

class FilterableGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      cat: '',
	  length: 0,
	  currentPage: 0,
	  itemPerPage: 0
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
	this.handleLengthChange = this.handleLengthChange.bind(this);
	this.handlePageChange = this.handlePageChange.bind(this);
	this.handleItemRestriction = this.handleItemRestriction.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleCatChange(data) {
	//console.log(data);
    if(data != this.state.cat)
	{
		this.setState({cat: data, currentPage: 1});
	}
  }
  
  handleLengthChange(data) {
	if(this.state.length != data)
	{
		this.setState({length: data});
	}
  }

  handlePageChange(data) 
  {
	this.setState({currentPage: data});
  }
  
  handleItemRestriction(data)
  {
	this.setState({itemPerPage: data});
  }
  
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
		  onCatChange={this.handleCatChange}
		  contents={this.props.contents}
        />
		<br />
        <Gallery
          contents={this.props.contents}
          filterText={this.state.filterText}
		  cat={this.state.cat}
		  length={this.handleLengthChange}
		  currentPage={this.state.currentPage}
		  itemPerPage={this.state.itemPerPage}
        />
		<Pagination length={this.state.length} currentPage={this.handlePageChange} cat={this.state.cat} itemPerPage={this.handleItemRestriction}/>
      </div>
    );
  }
}


const CONTENTS = [
{name: 'HTML5', cat: 'Frontend', desc:"", imgUrl: 'img/1200px-HTML5_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'XML', cat: 'Frontend', desc:"", imgUrl: 'img/xml-file.png', demoUrl:"", repoUrl:""}, 
{name: 'CSS3', cat: 'Frontend', desc:"", imgUrl: 'img/logo-2582747_960_720.png', demoUrl:"", repoUrl:""},
{name: 'SASS', cat: 'Frontend', desc:"", imgUrl: 'img/logo-b6e1ef6e.svg', demoUrl:"", repoUrl:""},
{name: 'LESS', cat: 'Frontend', desc:"", imgUrl: 'img/less_logo.png', demoUrl:"", repoUrl:""},
{name: 'Bootstrap', cat: 'Frontend', desc:"", imgUrl: 'img/Bootstrap.png', demoUrl:"", repoUrl:""},
{name: 'Wordpress', cat: 'Frontend', desc:"", imgUrl: 'img/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""},
{name: 'JavaScript', cat: 'Frontend', desc:"", imgUrl: 'img/javascript_logo.png', demoUrl:"", repoUrl:""},
{name: 'jQuery', cat: 'Frontend', desc:"",  imgUrl: 'img/jquery-icon.png', demoUrl:"", repoUrl:""},
{name: 'TypeScript', cat: 'Frontend', desc:"", imgUrl: 'img/3e2b342616822f8eabc9dd393840db4a.png', demoUrl:"", repoUrl:""},
{name: 'AngularJS', cat: 'Frontend', desc:"", imgUrl: 'img/angularjs.png', demoUrl:"", repoUrl:""},
{name: 'Angular', cat: 'Frontend', desc:"", imgUrl: 'img/b3f8b090-dedc-11e6-8252-d9f1e786360b-angular.svg', demoUrl:"", repoUrl:""},
{name: 'ReactJS', cat: 'Frontend', desc:"", imgUrl: 'img/react-logo-300x289.png', demoUrl:"", repoUrl:""},
{name: 'Java', cat: 'Backend', desc:"", imgUrl: 'img/3163796423.webp', demoUrl:"", repoUrl:""},
{name: 'Java Spring', cat: 'Backend', desc:"", imgUrl: 'img/spring-by-pivotal-9066b55828deb3c10e27e609af322c40.png', demoUrl:"", repoUrl:""},
{name: 'PHP', cat: 'Backend', desc:"", imgUrl: 'img/v5kl.png', demoUrl:"", repoUrl:""},
{name: 'C', cat: 'Backend', desc:"", imgUrl: 'img/The_C_Programming_Language_logo.svg.png', demoUrl:"", repoUrl:""},
{name: 'C++', cat: 'Backend', desc:"", imgUrl: 'img/cpp_logo.png', demoUrl:"", repoUrl:""},
{name: 'Python', cat: 'Backend', desc:"", imgUrl: 'img/python-logo.png', demoUrl:"", repoUrl:""},
{name: 'Node.JS', cat: 'Backend', desc:"", imgUrl: 'img/nodejs_logo.png', demoUrl:"", repoUrl:""},
{name: 'MySQL', cat: 'Database', desc:"", imgUrl: 'img/MySQL-logo-759x494.png', demoUrl:"", repoUrl:""},
{name: 'MongoDB', cat: 'Database', desc:"", imgUrl: 'img/mongodb-gui-tools.png', demoUrl:"", repoUrl:""},
{name: 'Eclipse', cat: 'Software', desc:"", imgUrl: 'img/eclipse-800x188.png', demoUrl:"", repoUrl:""},
{name: 'Microsoft Office', cat: 'Software', desc:"", imgUrl: 'img/2000px-Microsoft_Office_2013_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'Notepad++', cat: 'Software', desc:"", imgUrl: 'img/Notepad-Free-Download.png', demoUrl:"", repoUrl:""},
{name: 'VirtualBox', cat: 'Software', desc:"", imgUrl: 'img/Virtualbox_logo.png', demoUrl:"img/Notepad-Free-Download.png", repoUrl:""},
{name: 'WMware Workstation', cat: 'Software', desc:"", imgUrl: 'img/e5a7ce73b7a4b30361e3186c73a78a19--vmware-workstation-operating-system.jpg', demoUrl:"", repoUrl:""},
{name: 'WampServer', cat: 'Software', desc:"", imgUrl: 'img/Wampserver.png', demoUrl:"img/Notepad-Free-Download.png", repoUrl:""},
{name: 'Secure Shell Client', cat: 'Software', desc:"", imgUrl: 'img/ssh.png', demoUrl:"img/Notepad-Free-Download.png", repoUrl:""},
{name: 'MicroSoft Windows', cat: 'Operating System', desc:"", imgUrl: 'img/Windows_logo_Cyan_rgb_D.png', demoUrl:"", repoUrl:""},
{name: 'Unix/Linux', cat: 'Operating System', desc:"", imgUrl: 'img/pic.jpg', demoUrl:"", repoUrl:""},
{name: 'Heroku', cat: 'Cloud/Server', desc:"", imgUrl: 'img/heroku-logotype-vertical-purple1.png', demoUrl:"", repoUrl:""},
{name: 'GoDaddy', cat: 'Cloud/Server', desc:"", imgUrl: 'img/aboutus1.png', demoUrl:"", repoUrl:""},
{name: 'AWS', cat: 'Cloud/Server', desc:"", imgUrl: 'img/aws-final-logo.png', demoUrl:"", repoUrl:""},
{name: 'GitHub', cat: 'Cloud/Server', desc:"", imgUrl: 'img/github.png', demoUrl:"", repoUrl:""},
{name: 'WordPress', cat: 'Cloud/Server', desc:"", imgUrl: 'img/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""}
];

ReactDOM.render(
  <FilterableGallery contents={CONTENTS} />,
  document.getElementById('reactApp')
);

var emailStyle = {margin:'0 -16px 8px -16px'};

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

		<div className="w3-row-padding" style={emailStyle}>
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
