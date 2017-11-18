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
	
	//const 
	if(content.demoUrl==null)
	{
		
	}

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
		this.state = {currentPage:1, itemPerPage:3, cat:"all"};
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

{name: 'Java', cat: 'Backend', desc:"", imgUrl: 'img/3163796423.webp', demoUrl:"", repoUrl:""},
{name: 'Java Spring', cat: 'Backend', desc:"", imgUrl: 'img/spring-by-pivotal-9066b55828deb3c10e27e609af322c40.png', demoUrl:"", repoUrl:""},
{name: 'PHP', cat: 'Backend', desc:"", imgUrl: 'img/v5kl.png', demoUrl:"", repoUrl:""},
{name: 'C', cat: 'Backend', desc:"", imgUrl: 'img/The_C_Programming_Language_logo.svg.png', demoUrl:"", repoUrl:""},
{name: 'C++', cat: 'Backend', desc:"", imgUrl: 'img/cpp_logo.png', demoUrl:"", repoUrl:""},
{name: 'Python', cat: 'Big Data', desc:"", imgUrl: 'img/python-logo.png', demoUrl:"", repoUrl:""},
];

ReactDOM.render(
  <FilterableGallery contents={CONTENTS} />,
  document.getElementById('reactApp')
);
