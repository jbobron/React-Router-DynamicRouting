/* jshint globalstrict: true, esnext: true */

var React = require('react');
var Router = require('react-router');
var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var App = React.createClass({
  getInitialState: function(){
    return {
      videos: [
        {
          id:0,
          author: "Pele",
          date: "2 months ago",
          title: "Top 10 Soccer Goals",
          url: "https://www.youtube.com/watch?v=rYZW_ujLH40",
          views: 10000023400,
          img:"https://i.ytimg.com/vi_webp/rYZW_ujLH40/mqdefault.webp"
        }, 
        {
          id:1,
          author: "Rover Hendrix",
          date: "4 years ago",
          title: "Dog Sneezing",
          url: "https://www.youtube.com/watch?v=829os-2BQBM",
          views: 10000000,
          img:"https://i.ytimg.com/vi_webp/829os-2BQBM/mqdefault.webp"
        },
        {
          id:2,
          author: "Rover Hendrix",
          date: "4 years ago",
          title: "Dog Sneezing",
          url: "https://www.youtube.com/watch?v=829os-2BQBM",
          views: 10000000,
          img:"https://i.ytimg.com/vi_webp/829os-2BQBM/mqdefault.webp"
        },
        {
          id:3,
          author: "Rover Hendrix",
          date: "4 years ago",
          title: "Dog Sneezing",
          url: "https://www.youtube.com/watch?v=829os-2BQBM",
          views: 10000000,
          img:"https://i.ytimg.com/vi_webp/829os-2BQBM/mqdefault.webp"
        }
      ]
    }
  },
  render: function() {
    return (
      <div>
        <Header/>
        <Link videos={this.state.videos} to="index"></Link>
        <Link to="uploader"></Link>
        <div className="Content">
        <RouteHandler {...this.state}/>
        </div>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className='header'>
        <Link to='index'><img className='logo' width="30px" height="20px" src="src/youtube-logo.jpg"/></Link>
        <input class="form-control" className="inputForm" type="text">
          <button className="searchButton"><img src='src/search-icon.png' className="searchIcon" height="10px" width="auto"/></button>
        </input>

        <button className="uploadButton" class="btn btn-default" ><Link to='uploader'>Upload</Link></button>
      </div>
    );
  }

});

////////////////////////////////////////////  INDEX ///////////////////////////////////////
var Index = React.createClass({
  render: function() {
    var videos = this.props.videos.map(function(video){
      return <li key={video.id}><Link to="viewer" params={video}>{video.title}</Link></li>;
    });
    return (
      <div className="index">
        <VideoCards videos={this.props.videos}/>
      </div>
    );
  }

});

var VideoCards = React.createClass({
  render: function() {
    var props = this.props;
    var videos = this.props.videos.map(function(video){
      return <VideoCard video={props} vidid={video}/>
    });
    return (
      <div>
        <ul className="videosGrid">
          {videos}
        </ul>
      </div>
    );
  }
});

var VideoCard = React.createClass({
  render: function() {
    return (
      <li className="videoCard">
        <Link to="viewer" params={this.props.vidid}>
          <img height="110px" width="196px" src={this.props.vidid.img}/>
        </Link>
        <h3 className="vidTitle">{this.props.vidid.title}</h3>
        <div>by <Link to="viewer" params={this.props.vidid}>{this.props.vidid.author}</Link></div>
        <div>
          <ul className="ulviewsDates">
            <li className="viewsDates">{this.props.vidid.views} views</li>
            <li content="\002022" className="viewsDates">{this.props.vidid.date}</li>
          </ul>
        </div>

      </li>
    );
  }

});
////////////////////////////////////////////  VIEWER ///////////////////////////////////////
var Viewer = React.createClass({

  render: function() {
    var index = this.props.params.id
    console.log(index)
    var url = this.props.videos[index].url.replace("watch?v=", "v/");
    url = url + '&amp;autoplay=1';
    console.log("URL ", url)
    return (
      <div class="viewer-content" className="viewercontent">
        <iframe  type="text/html" width="640" height="360" src={url}
        frameborder="0" allowFullScreen></iframe>
        <div>
          <h1> {this.props.videos[index].title} </h1>
          <div>
            <p>By {this.props.videos[index].author}</p>
            <p>{this.props.videos[index].views} views</p>

          </div>
        </div>
      </div>
    );
  }
});



////////////////////////////////////////////  UPLOADER /////////////////////////////////////
var Uploader = React.createClass({
  render: function() {
    return (
      <div>
        <h1> Uploader!</h1>
      </div>
    );
  }
});


var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={Index}/>
    <Route name="viewer" path="viewer/:id" handler={Viewer}/>
    <Route name="uploader" path="uploader" handler={Uploader}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
