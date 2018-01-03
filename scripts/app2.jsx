const Shuffle = window.Shuffle;
window.sr = ScrollReveal();
	
class Thumbnail extends React.Component {
	
	constructor() {
		super();
    }
	
	componentDidMount() {
		
		const config = {
			reset: true,
		}
		//sr.reveal(this.element, config);
	}
	
	render() {
		const divStyle = {
			color: 'blue'
		};
		
		const content = this.props.content;
		
		return (
			<div ref={element => this.element = element} class="w3-col w3-margin-bottom thumbnailContainer">
			
			<div class="container">
			<img src={content.imgUrl} onclick="" alt="The mist over the mountains"/>
			<div class="overlay"><div class="text">{content.cat}</div></div>
			</div>
			
			<div class="thumbnailName">{content.name}</div>
			
			</div>
		);
  }
}

class Gallery extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {filterText: ''};
		
		this.thumbnails = [];
	}
	
	componentDidMount() {
		// The elements are in the DOM, initialize a shuffle instance.
		this.shuffle = new Shuffle(this.element, {
			itemSelector: '.thumbnailContainer',
			sizer: this.sizer,
			//useTransforms: false
		});
	}
	
	componentDidUpdate() {
		
		// Notify shuffle to dump the elements it's currently holding and consider
		// all elements matching the `itemSelector` as new.
		
		var filterText = this.props.filterText.toLowerCase();
		
		this.shuffle.filter(function (element, shuffle) {
			var titleElement = element.querySelector('.thumbnailName');
			var titleText = titleElement.textContent.toLowerCase().trim();

			return titleText.indexOf(filterText) !== -1;
		});
		
		//this.shuffle.update();
		this.shuffle.resetItems();
	}
	
	render() {
		const filterText = this.props.filterText.toLowerCase();
		
		
		this.thumbnails = [];
		
		//const thumbnails = [];
		/*
		this.props.contents.forEach((content) => {
			
			//if (content.name.toLowerCase().indexOf(filterText) === -1) {
				//return;
			//}	
			
			thumbnails.push(
				<Thumbnail
				content={content}
				key={content.name}
				/>
			);
		});*/
		
		this.props.contents.forEach((content) => {
			this.thumbnails.push(
				<Thumbnail
				content={content}
				key={content.name}
				/>
			);
		});
		
		// Logic for displaying current items
		const indexOfLastItem = this.props.currentPage * this.props.itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - this.props.itemsPerPage;
		const newThumbnails = this.thumbnails.slice(indexOfFirstItem, indexOfLastItem);
		
		return (
			<div ref={element => this.element = element} class="w3-row-padding w3-center">
			{newThumbnails}
			<div ref={element => this.sizer = element} class="sizer"></div>
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}
  
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}
  
	render() {
		return (
			<form>
				<input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextChange}/>
			</form>
		);
	}
}

class Pagination extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			currentPage: 1,
			itemsPerPage: 9
		};
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.props.currentPage(this.state.currentPage);
		this.props.itemsPerPage(this.state.itemsPerPage);
	}
	
	handleClick(event) {
		if((Number(event.target.id) > 0) && 
			(Number(event.target.id) <= Math.ceil(this.props.length / this.state.itemsPerPage))) {
				
			this.setState({currentPage: Number(event.target.id)});
			this.props.currentPage(Number(event.target.id));
		}
	}
	
	render() {
		const {currentPage, itemsPerPage } = this.state;

		// Logic for displaying page numbers
		const pageNumbers = [];
		
		for (let i = 1; i <= Math.ceil(this.props.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (<a href="javascript:void(0)" class="w3-button" key={number} id={number} onClick={this.handleClick}>{number}</a>);
			
		});

		return (
			<div>
			<div class="w3-center">
			<div class="w3-bar">
				<a href="javascript:void(0)"  class="w3-button" id={1} onClick={this.handleClick}>&laquo;</a>
				<a href="javascript:void(0)"  class="w3-button" id={this.state.currentPage - 1} onClick={this.handleClick}>&lt;</a>
				{renderPageNumbers}
				<a href="javascript:void(0)"  class="w3-button" id={this.state.currentPage + 1} onClick={this.handleClick}>&gt;</a>
				<a href="javascript:void(0)"  class="w3-button" id={renderPageNumbers.length} onClick={this.handleClick}>&raquo;</a>
			</div>
			</div>
			</div>
		);
	}
}

class FilterableGallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      filterText: '',
	  itemsPerPage: 0,
	  currentPage: 0
	};
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	this.handleItemRestriction = this.handleItemRestriction.bind(this);
	this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleItemRestriction(data){
	this.setState({itemsPerPage: data});
  }
  
  handlePageChange(data) {
	this.setState({currentPage: data});
  }
  
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
		<br />
        <Gallery
          contents={this.props.contents}
          filterText={this.state.filterText}
		  itemsPerPage={this.state.itemsPerPage}
		  currentPage={this.state.currentPage}
        />
		<br />
		<Pagination length={this.props.contents.length} itemsPerPage={this.handleItemRestriction} currentPage={this.handlePageChange}/>
      </div>
    );
  }
}

const CONTENTS = [
{name: 'HTML5', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/1200px-HTML5_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'XML', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/xml-file.png', demoUrl:"", repoUrl:""}, 
{name: 'CSS3', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/logo-2582747_960_720.png', demoUrl:"", repoUrl:""},
{name: 'SASS', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/logo-b6e1ef6e.svg', demoUrl:"", repoUrl:""},
{name: 'LESS', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/less_logo.png', demoUrl:"", repoUrl:""},
{name: 'Bootstrap', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/Bootstrap.png', demoUrl:"", repoUrl:""},
{name: 'Wordpress', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""},
{name: 'JavaScript', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/javascript_logo.png', demoUrl:"", repoUrl:""},
{name: 'jQuery', cat: 'Frontend', desc:"",  imgUrl: 'source/gallery/jquery-icon.png', demoUrl:"", repoUrl:""},
{name: 'TypeScript', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/3e2b342616822f8eabc9dd393840db4a.png', demoUrl:"", repoUrl:""},
{name: 'AngularJS', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/angularjs.png', demoUrl:"", repoUrl:""},
{name: 'Angular', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/b3f8b090-dedc-11e6-8252-d9f1e786360b-angular.svg', demoUrl:"http://www.google.ca", repoUrl:""},
{name: 'ReactJS', cat: 'Frontend', desc:"", imgUrl: 'source/gallery/react-logo-300x289.png', demoUrl:"", repoUrl:""},
{name: 'Java', cat: 'Backend', desc:"", imgUrl: 'source/gallery/3163796423.webp', demoUrl:"", repoUrl:""},
{name: 'Java Spring', cat: 'Backend', desc:"", imgUrl: 'source/gallery/spring-by-pivotal-9066b55828deb3c10e27e609af322c40.png', demoUrl:"", repoUrl:""},
{name: 'PHP', cat: 'Backend', desc:"", imgUrl: 'source/gallery/v5kl.png', demoUrl:"", repoUrl:""},
{name: 'C', cat: 'Backend', desc:"", imgUrl: 'source/gallery/The_C_Programming_Language_logo.svg.png', demoUrl:"", repoUrl:""},
{name: 'C++', cat: 'Backend', desc:"", imgUrl: 'source/gallery/cpp_logo.png', demoUrl:"", repoUrl:""},
{name: 'Python', cat: 'Backend', desc:"", imgUrl: 'source/gallery/python-logo.png', demoUrl:"", repoUrl:""},
{name: 'Node.JS', cat: 'Backend', desc:"", imgUrl: 'source/gallery/nodejs_logo.png', demoUrl:"", repoUrl:""},
{name: 'MySQL', cat: 'Database', desc:"", imgUrl: 'source/gallery/MySQL-logo-759x494.png', demoUrl:"", repoUrl:""},
{name: 'MongoDB', cat: 'Database', desc:"", imgUrl: 'source/gallery/mongodb-gui-tools.png', demoUrl:"", repoUrl:""},
{name: 'Eclipse', cat: 'Software', desc:"", imgUrl: 'source/gallery/eclipse-800x188.png', demoUrl:"", repoUrl:""},
{name: 'Microsoft Office', cat: 'Software', desc:"", imgUrl: 'source/gallery/2000px-Microsoft_Office_2013_logo_and_wordmark.svg.png', demoUrl:"", repoUrl:""},
{name: 'Notepad++', cat: 'Software', desc:"", imgUrl: 'source/gallery/Notepad-Free-Download.png', demoUrl:"", repoUrl:""},
{name: 'VirtualBox', cat: 'Software', desc:"", imgUrl: 'source/gallery/Virtualbox_logo.png', demoUrl:"", repoUrl:""},
{name: 'WMware Workstation', cat: 'Software', desc:"", imgUrl: 'source/gallery/e5a7ce73b7a4b30361e3186c73a78a19--vmware-workstation-operating-system.jpg', demoUrl:"", repoUrl:""},
{name: 'WampServer', cat: 'Software', desc:"", imgUrl: 'source/gallery/Wampserver.png', demoUrl:"", repoUrl:""},
{name: 'Secure Shell Client', cat: 'Software', desc:"", imgUrl: 'source/gallery/ssh.png', demoUrl:"", repoUrl:""},
{name: 'MicroSoft Windows', cat: 'Operating System', desc:"", imgUrl: 'source/gallery/Windows_logo_Cyan_rgb_D.png', demoUrl:"", repoUrl:""},
{name: 'Unix/Linux', cat: 'Operating System', desc:"", imgUrl: 'source/gallery/pic.jpg', demoUrl:"", repoUrl:""},
{name: 'Heroku', cat: 'Cloud/Server', desc:"", imgUrl: 'source/gallery/heroku-logotype-vertical-purple1.png', demoUrl:"", repoUrl:""},
{name: 'GoDaddy', cat: 'Cloud/Server', desc:"", imgUrl: 'source/gallery/aboutus1.png', demoUrl:"", repoUrl:""},
{name: 'AWS', cat: 'Cloud/Server', desc:"", imgUrl: 'source/gallery/aws-final-logo.png', demoUrl:"", repoUrl:""},
{name: 'GitHub', cat: 'Cloud/Server', desc:"", imgUrl: 'source/gallery/github.png', demoUrl:"", repoUrl:"", demoUrl:"", repoUrl:""},
{name: 'WordPress', cat: 'Cloud/Server', desc:"", imgUrl: 'source/gallery/wordpress-logo-stacked-rgb.png', demoUrl:"", repoUrl:""}
];

ReactDOM.render(
  <FilterableGallery contents={CONTENTS} />,
  document.getElementById('reactApp')
);
