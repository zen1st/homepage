const Shuffle = window.Shuffle;

class Thumbnail extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {imgLoaderClass:"imgLoader", imgContentClass:"imgContent", imgOpacity:0};
	}
	
	handleImageLoaded() {
		setTimeout(function() {this.setState({imgLoaderClass:"", imgContentClass:"", imgOpacity:1}); }.bind(this), 1000);
	}
	
	render() {
    const content = this.props.content;
	
	const imgStyle = {
		opacity:this.state.imgOpacity
	};
		
	var overlay;
	if(content.repoUrl!="" || content.demoUrl!=""){
		var repo = content.repoUrl!="" ? <a href={content.repoUrl} title="Repository"><i className="fa fa-github" aria-hidden="true"></i></a> : "";
		var demo = content.demoUrl!="" ? <a href={content.demoUrl} title="Demonstration"><i className="fa fa-window-restore" aria-hidden="true"></i></a> : "";
		overlay = <div className='overlay'>
					<div className='hover-content'>
					{repo}{demo}
					</div></div>;
	}
	//console.log(content.cat);
	//const dataGroups = "['" + content.cat + "']";
	//console.log(dataGroups);
	
    return (
    <div className="w3-third w3-container w3-margin-bottom thumbnailContainer" data-groups={content.cat}>
	<div className="w3-display-container">
	<div className={this.state.imgContentClass}><div className={this.state.imgLoaderClass}></div>
    <img src={content.imgUrl} className="thumbnail" style={imgStyle} onLoad={this.handleImageLoaded.bind(this)}/>
	</div>
	{overlay}
	</div>
	<div className="w3-container w3-white w3-center"><p><b>{content.name}</b></p></div>
    </div>
    );
  }
}

class Gallery extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		// The elements are in the DOM, initialize a shuffle instance.
		//var element = document.querySelector('.galleryGrid');
		this.shuffle = new Shuffle(this.element, {
			itemSelector: '.thumbnailContainer',
			delimeter: ',',
			sizer: this.sizer
		 });
	}
  
	componentDidUpdate() {
		// Notify shuffle to dump the elements it's currently holding and consider
		// all elements matching the `itemSelector` as new.
		this.shuffle.filter(this.props.cat);
		this.shuffle.resetItems();
	}
	
	componentWillUnmount() {
		// Dispose of shuffle when it will be removed from the DOM.
		this.shuffle.destroy();
		this.shuffle = null;
	}
	
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
	const lastIndex = this.props.currentPage * this.props.itemsPerPage;
	const firstIndex = lastIndex - this.props.itemsPerPage;
	const newThumbnails = thumbnails.slice(firstIndex, lastIndex);
	
	const sizerStyle = {
		position: "absolute",
		width: "33.33333333%"
	};
		
    return (
	<div ref={element => this.element = element} className="w3-row-padding" onChange={this.handleLengthChange(thumbnails.length)}>
	{newThumbnails}
	<div ref={element => this.sizer = element} style={sizerStyle}></div>
	</div>
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
		this.state = {currentPage:1, 
					itemsPerPage:6, 
					filterText: '',
					cat:"all"};
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.props.currentPage(this.state.currentPage);
		this.props.itemsPerPage(this.state.itemsPerPage);
	}
	
	componentWillReceiveProps(data)
	{
		if(data.cat != this.state.cat)
		{
			this.setState({currentPage:1, cat:data.cat});
		}
		
		if(data.filterText != this.state.filterText){
			this.setState({currentPage:1, filterText:data.filterText});
			this.props.currentPage(1);
		}
	}
	
	handleClick(event) 
	{
		if((Number(event.target.id) > 0) && 
			(Number(event.target.id) <= Math.ceil(this.props.length / this.state.itemsPerPage))) {
				
			this.setState({currentPage: Number(event.target.id)});			
			this.props.currentPage(Number(event.target.id));
			/*$("#pagination a").removeClass("w3-green");
			var id = Number(event.target.id);
			$("#pagination a:nth-child(" + id + ")").addClass("w3-green");	*/
		}
	}
	
	render() 
	{
		const {currentPage, itemsPerPage} = this.state;
		
		// Logic for displaying page number
		const pageNumber = [];
		for (let i = 1; i <= Math.ceil(this.props.length / itemsPerPage); i++) 
		{
			pageNumber.push(i);
		}
	
		const renderPageNumbers = pageNumber.map(number => 
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
				<a href="javascript:void(0)"  class="w3-button" id={1} onClick={this.handleClick}>&laquo;</a>
				<a href="javascript:void(0)"  class="w3-button" id={this.state.currentPage - 1} onClick={this.handleClick}>&lt;</a>
				{renderPageNumbers}  
				<a href="javascript:void(0)"  class="w3-button" id={this.state.currentPage + 1} onClick={this.handleClick}>&gt;</a>
				<a href="javascript:void(0)"  class="w3-button" id={renderPageNumbers.length} onClick={this.handleClick}>&raquo;</a>
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
	  itemsPerPage: 0
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
	this.setState({itemsPerPage: data});
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
		  itemsPerPage={this.state.itemsPerPage}
        />
		<Pagination 
			length={this.state.length} 
			filterText={this.state.filterText}
			currentPage={this.handlePageChange} 
			cat={this.state.cat} 
			itemsPerPage={this.handleItemRestriction}/>
		</div>
    );
  }
}

class Carousel extends React.Component {
	
	constructor(props){
		super(props);
	}
	render(){
		return (
		<div class="carousel" data-gap="5">
		<figure>
			<img src="http://localhost/homepage/img/gallery/The_C_Programming_Language_logo.svg.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/b3f8b090-dedc-11e6-8252-d9f1e786360b-angular.svg" alt="" />
			<img src="http://localhost/homepage/img/gallery/Bootstrap.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/cpp_logo.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/aws-final-logo.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/heroku-logotype-vertical-purple1.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/1200px-HTML5_logo_and_wordmark.svg.png" alt="" />
			<img src="http://localhost/homepage/img/gallery/logo-2582747_960_720.png" alt="" />
		</figure>
		<nav>
			<button class="nav prev">Prev</button>
			<button class="nav next">Next</button>
		</nav>
		</div>
	);
	}
}

class Contents extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
		<div>
			<div class="w3-content w3-container w3-padding-64" id="section2">
			<h3 class="w3-center">MY TECH STACK</h3>
			<p class="w3-center">
			<em>Here are some of the programming languages, scripts, markups, frameworks, libraries, APIs, and environment that I'm experienced in.</em>
			</p>
			<FilterableGallery contents = {this.props.galleryContents} />
			</div>

			<div class="bgimg-3 w3-display-container w3-opacity-min">
			<div class="w3-display-middle">
			<div class="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-hover-grey scrollRevealLeft"> 
			PROJECTS
			</div>
			</div>
			</div>

			<div class="w3-content w3-container w3-padding-64" id="section3">
			<h3 class="w3-center">MY WORK</h3>
			<p class="w3-center"><em>Here are some of my latest work</em></p><br />

			<div class="w3-container">
			<Carousel />
			</div>
			</div>
		</div>
	);
	}
}

const galleryContents = [
{name: 'HTML5', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/1200px-HTML5_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'XML', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/xml-file.png', demoUrl:"", repoUrl:""}, 
{name: 'CSS3', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/logo-2582747_960_720.png', demoUrl:"", repoUrl:""},
{name: 'SASS', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/logo-b6e1ef6e.svg', demoUrl:"", repoUrl:""},
{name: 'LESS', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/less_logo.png', demoUrl:"", repoUrl:""},
{name: 'Bootstrap', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/Bootstrap.png', demoUrl:"", repoUrl:""},
{name: 'Wordpress', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""},
{name: 'JavaScript', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/javascript_logo.png', demoUrl:"", repoUrl:""},
{name: 'jQuery', cat: 'Frontend', desc:"",  imgUrl: 'img/gallery/jquery-icon.png', demoUrl:"", repoUrl:""},
{name: 'TypeScript', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/3e2b342616822f8eabc9dd393840db4a.png', demoUrl:"", repoUrl:""},
{name: 'AngularJS', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/angularjs.png', demoUrl:"", repoUrl:""},
{name: 'Angular', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/b3f8b090-dedc-11e6-8252-d9f1e786360b-angular.svg', demoUrl:"http://www.google.ca", repoUrl:""},
{name: 'ReactJS', cat: 'Frontend', desc:"", imgUrl: 'img/gallery/react-logo-300x289.png', demoUrl:"", repoUrl:""},
{name: 'Java', cat: 'Backend', desc:"", imgUrl: 'img/gallery/3163796423.webp', demoUrl:"", repoUrl:""},
{name: 'Java Spring', cat: 'Backend', desc:"", imgUrl: 'img/gallery/spring-by-pivotal-9066b55828deb3c10e27e609af322c40.png', demoUrl:"", repoUrl:""},
{name: 'PHP', cat: 'Backend', desc:"", imgUrl: 'img/gallery/v5kl.png', demoUrl:"", repoUrl:""},
{name: 'C', cat: 'Backend', desc:"", imgUrl: 'img/gallery/The_C_Programming_Language_logo.svg.png', demoUrl:"", repoUrl:""},
{name: 'C++', cat: 'Backend', desc:"", imgUrl: 'img/gallery/cpp_logo.png', demoUrl:"", repoUrl:""},
{name: 'Python', cat: 'Backend', desc:"", imgUrl: 'img/gallery/python-logo.png', demoUrl:"", repoUrl:""},
{name: 'Node.JS', cat: 'Backend', desc:"", imgUrl: 'img/gallery/nodejs_logo.png', demoUrl:"", repoUrl:""},
{name: 'MySQL', cat: 'Database', desc:"", imgUrl: 'img/gallery/MySQL-logo-759x494.png', demoUrl:"", repoUrl:""},
{name: 'MongoDB', cat: 'Database', desc:"", imgUrl: 'img/gallery/mongodb-gui-tools.png', demoUrl:"", repoUrl:""},
{name: 'Eclipse', cat: 'Software', desc:"", imgUrl: 'img/gallery/eclipse-800x188.png', demoUrl:"", repoUrl:""},
{name: 'Microsoft Office', cat: 'Software', desc:"", imgUrl: 'img/gallery/2000px-Microsoft_Office_2013_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'Notepad++', cat: 'Software', desc:"", imgUrl: 'img/gallery/Notepad-Free-Download.png', demoUrl:"", repoUrl:""},
{name: 'VirtualBox', cat: 'Software', desc:"", imgUrl: 'img/gallery/Virtualbox_logo.png', demoUrl:"", repoUrl:""},
{name: 'WMware Workstation', cat: 'Software', desc:"", imgUrl: 'img/gallery/e5a7ce73b7a4b30361e3186c73a78a19--vmware-workstation-operating-system.jpg', demoUrl:"", repoUrl:""},
{name: 'WampServer', cat: 'Software', desc:"", imgUrl: 'img/gallery/Wampserver.png', demoUrl:"", repoUrl:""},
{name: 'Secure Shell Client', cat: 'Software', desc:"", imgUrl: 'img/gallery/ssh.png', demoUrl:"", repoUrl:""},
{name: 'MicroSoft Windows', cat: 'Operating System', desc:"", imgUrl: 'img/gallery/Windows_logo_Cyan_rgb_D.png', demoUrl:"", repoUrl:""},
{name: 'Unix/Linux', cat: 'Operating System', desc:"", imgUrl: 'img/gallery/pic.jpg', demoUrl:"", repoUrl:""},
{name: 'Heroku', cat: 'Cloud/Server', desc:"", imgUrl: 'img/gallery/heroku-logotype-vertical-purple1.png', demoUrl:"", repoUrl:""},
{name: 'GoDaddy', cat: 'Cloud/Server', desc:"", imgUrl: 'img/gallery/aboutus1.png', demoUrl:"", repoUrl:""},
{name: 'AWS', cat: 'Cloud/Server', desc:"", imgUrl: 'img/gallery/aws-final-logo.png', demoUrl:"", repoUrl:""},
{name: 'GitHub', cat: 'Cloud/Server', desc:"", imgUrl: 'img/gallery/github.png', demoUrl:"", repoUrl:"", demoUrl:"", repoUrl:""},
{name: 'WordPress', cat: 'Cloud/Server', desc:"", imgUrl: 'img/gallery/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""}
];

galleryContents.sort(function(a, b){
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
});

ReactDOM.render(
  <Contents galleryContents={galleryContents} />,
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
