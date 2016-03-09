var React = require("react");

class DevSection extends React.Component{
  constructor(props){
    super(props);
  };

  render() {
    return (
      <div>
        <h3> Dev Section </h3>
        <pre>
          {JSON.stringify(this.props.data, null, '\t')}
        </pre>
      </div>
    );
  };

}

module.exports = DevSection;