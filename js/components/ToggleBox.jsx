var React = require("react");

var Switch = require('./Switch.jsx');

var ToggleBox = React.createClass({

	propTypes: {
		className: React.PropTypes.string.isRequired,
		enabled: React.PropTypes.bool.isRequired,
		pending: React.PropTypes.bool.isRequired,
		onChangeHandler: React.PropTypes.func.isRequired
	},

	onChangeHandler: function(evt) {
		this.setState({
			enabled: evt.target.checked
		});
		this.props.onChangeHandler(evt);
	},

	wrapperClasses: function() {
		if(this.props.pending) {
			return this.props.className + "-toggle alert alert-warning";
		} else if(this.props.enabled) {
			return this.props.className + "-toggle alert alert-info";
		}
		return this.props.className + "-toggle disabled";
	},

	render: function() {

		var infoText = null;
		if(this.props.pending) {
			infoText = <PendingInfo {...this.props} />;
		} else if(!this.props.enabled) {
			infoText = <DisabledInfo {...this.props} />;
		}

		return (
			<div className={this.wrapperClasses()}>
				<div className="status">
					<div className="switch">
						<Switch
							checked={this.props.enabled}
							changeHandler={this.onChangeHandler}
						/>
					</div>
					<div className="text">
						Your {this.props.className} is { this.props.enabled ? "enabled" : "disabled" }
					</div>
				</div>
				{ infoText }
			</div>
		);
	}
});

function DisabledInfo() {
	return (
		<div className="clearfix info">
			Any changes will require full deployment for them to be active.
		</div>
	);
}

function PendingInfo(props) {
	return (
		<div
			className="clearfix info"
			dangerouslySetInnerHTML={{__html:props.FullDeployNeededMessage}}
		>
		</div>
	);
}

module.exports = ToggleBox;
