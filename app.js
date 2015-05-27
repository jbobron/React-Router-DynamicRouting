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
      videos: [{id:1,title:'jake'}, {id:2,title:'bill'}]
    }
  },
  render: function() {
    return (
      <div>
        <Link videos={this.state.videos} to="index">Index</Link>
        <Link to="uploader">Uploader</Link>
        <div className="Content">
        <RouteHandler {...this.state}/>
        </div>
      </div>
    );
  }
});

var Index = React.createClass({
  render: function() {
    var videos = this.props.videos.map(function(video){
      return <li key={video.id}><Link to="viewer" params={video}>{video.title}</Link></li>;
    });
    return (
      <div>
        <h1>Index!</h1>
        <ul>
          {videos}
        </ul>
      </div>
    );
  }

});


var Viewer = React.createClass({
  render: function() {
    console.log("viewer props", this.props)
    return (
      <div>
        <h1>Viewer!</h1>
        <h2> Params: {this.props.params} </h2>
      </div>
    );
  }
});

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
